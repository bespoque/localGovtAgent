import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";

import Loader from "react-loader-spinner";
import { PrintSingleTcc } from "../tables/viewtccTable";
import setAuthToken from "../../functions/setAuthToken";

const ViewTCCPrint = () => {
  const [isFetching, setIsFetching] = useState(() => true);
  const [tccdata, setTccData] = useState(() => []);
  const [assess1, setAssess1] = useState(() => []);
  const [assess2, setAssess2] = useState([]);
  const [assess3, setAssess3] = useState([]);
  const [addAss1, setAddAss1] = useState([]);
  const [addAss2, setAddAss2] = useState([]);
  const [addAss3, setAddAss3] = useState([]);
  const [tccID, setTccID] = useState(() => []);
  const [tccUploads, setTccUploads] = useState(() => []);
  const router = useRouter();
  useEffect(() => {
    setAuthToken();
    if (router && router.query) {
      let tCCId = router.query.ref;
      setTccID(tCCId);
      let id = {
        id: `${tCCId}`,
      };
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}user/da/view-tp-tcc`, id);
          let fetctTcc = res.data.body;
          console.log("fetctTcc", fetctTcc);
          let tccdat = fetctTcc.tcc;
          let firstass = fetctTcc.assessment1;
          let secondass = fetctTcc.assessment2;
          let thirdass = fetctTcc.assessment3;
          let uploads = fetctTcc.tccUploadPass;
          let addassess1 = fetctTcc.addAssessment1;
          let addassess2 = fetctTcc.addAssessment2;
          let addassess3 = fetctTcc.addAssessment3;
          setTccUploads(uploads);
          setTccData(tccdat);
          setAssess1(firstass);
          setAssess2(secondass);
          setAssess3(thirdass);
          setAddAss1(addassess1);
          setAddAss2(addassess2);
          setAddAss3(addassess3);

          setIsFetching(false);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  return (
    <>
      <SectionTitle subtitle="Print Tcc" />

      <Widget>
        <>
          {isFetching ? (
            <div className="flex justify-center item mb-2">
              <Loader
                visible={isFetching}
                type="BallTriangle"
                color="pink"
                height={19}
                width={19}
                timeout={0}
                className="ml-2"
              />
              <p>Fetching data...</p>
            </div>
          ) : (
            <PrintSingleTcc
              addAss1={addAss1}
              addAss2={addAss2}
              addAss3={addAss3}
              tccUploads={tccUploads}
              tccID={tccID}
              payerDetails={tccdata}
              assessmentData={assess1}
              assessmentData2={assess2}
              assessmentData3={assess3}
            />
          )}
        </>
      </Widget>
    </>
  );
};

export default ViewTCCPrint;
