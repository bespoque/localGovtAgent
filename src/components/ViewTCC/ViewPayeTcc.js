import SectionTitle from "../section-title";
import Widget from "../widget";
import { SubmitButton } from "../CustomButton/CustomButton";
import { NewFormInput } from "../FormInput/formInputs";
import { ViewAnnualTable } from "../tables/viewAnnual";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import Widget1 from "../dashboard/widget-1";
import * as Icons from "../Icons/index";
import jwt from "jsonwebtoken";
import { ViewTccTable } from "../tables/viewtccTable";
import { shallowEqual, useSelector } from "react-redux";
import { ViewPayeTableTCC, ViewTccTableTCC } from "../tables/viewtccPayeTable";

const ViewTccPaye = () => {
  const [isFetching, setIsFetching] = useState(() => true);
  const [tcc, setTcc] = useState(() => []);

  const { auth } = useSelector(
    (state) => ({
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const decoded = jwt.decode(auth);
  const kgtin = decoded.kgtin;
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(
          `${url.BASE_URL}user/paye/list-tp-tcc?kgtin=${kgtin}`
        );
        console.log("res", res);
        res = res.data.body.tccPrint;

        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.taxYr_1 = formatNumber(rec.taxYr_1);
          rec.taxYr_2 = formatNumber(rec.taxYr_2);
          rec.taxYr_3 = formatNumber(rec.taxYr_3);
          rec.prc_fee = formatNumber(rec.prc_fee);
          rec.crt_time = dateformat(rec.crt_time, "dd mmm yyyy");
          records.push(rec);
        }
        setIsFetching(false);
        setTcc(() => records);
      } catch (e) {
        setIsFetching(false);
        // console.log(e.response);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <SectionTitle title="View Tcc" />

      {isFetching && (
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
      )}
      <Widget>
        <div className="mt-4">
          <>
            <ViewPayeTableTCC tccData={tcc} />
          </>
        </div>
      </Widget>
    </>
  );
};

export default ViewTccPaye;
