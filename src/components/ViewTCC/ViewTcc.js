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

const ViewTcc = () => {
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
          `${url.BASE_URL}user/da/list-tp-tcc?kgtin=${kgtin}`
        );
        res = res.data.body.tccPrint;
        console.log("res", res);
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.amount1 = formatNumber(rec.amount1);
          rec.amount2 = formatNumber(rec.amount2);
          rec.amount3 = formatNumber(rec.amount3);
          rec.crt_time = dateformat(rec.crt_time, "mm yyyy");
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
            <ViewTccTable tccData={tcc} />
          </>
        </div>
      </Widget>
    </>
  );
};

export default ViewTcc;
