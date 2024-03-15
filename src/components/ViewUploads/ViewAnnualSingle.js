import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import { useRouter } from "next/router";
import { ViewMonthlyTableSingle } from "../tables/viewMonthlyTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import { DeleteButton } from "../CustomButton/CustomButton";
import Link from "next/link";
import Loader from "react-loader-spinner";
import { ViewAnnualTableSingle } from "../tables/viewAnnual";
import dateformat from "dateformat";

const ViewAnnualSingle = () => {
  const [post, setPost] = useState(() => []);
  const [total, setTotal] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [uploadYear, setUploadYear] = useState(10);
  const [query, setQuery] = useState(() => "");
  const [status, setStatus] = useState(() => "");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      let routeData = String(router.query.ref);
      let year = routeData.split("_").shift();
      let status = routeData.split("_").pop();
      setStatus(status);
      setUploadYear(year);
      year = `${year}-01-01`;
      console.log(year);
      let yearValue = {
        year: `${year}`,
      };
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(
            `${url.BASE_URL}annual/view-annual`,
            yearValue
          );
          console.log("res", res);
          res = res.data.body.annualYr;
          let sum = {};
          let records = [];
          let salarySum = [];
          let reliefSum = [];
          let pensionSum = [];
          let nhisSum = [];
          let lapSum = [];
          let netTaxSum = [];
          let expTaxSum = [];
          for (let i = 0; i < res.length; i++) {
            let rec = res[i];
            rec.salary = Number(rec.basic_salary);
            rec.consolRel = Number(rec.con_rel_cal);
            rec.pens = Number(rec.pension);
            rec.nhisScheme = Number(rec.nhis);
            rec.lapScheme = Number(rec.lap);
            rec.netTax = Number(rec.net_tax_ded);
            rec.expTax = Number(rec.tax_pay_cal);
            reliefSum.push(rec.consolRel);
            salarySum.push(rec.salary);
            pensionSum.push(rec.pens);
            nhisSum.push(rec.nhisScheme);
            lapSum.push(rec.lapScheme);
            netTaxSum.push(rec.netTax);
            expTaxSum.push(rec.expTax);
            rec.year = dateformat(rec.year, "yyyy");
            rec.tax = parseInt(rec.tax);
            // taxSum.push(rec.tax);
            rec.nhis = formatNumber(rec.nhis);
            rec.lap = formatNumber(rec.lap);
            rec.net_tax_ded = formatNumber(rec.net_tax_ded);
            rec.tax_pay_cal = formatNumber(rec.tax_pay_cal);
            rec.con_rel_cal = formatNumber(rec.con_rel_cal);
            rec.basic_salary = formatNumber(rec.basic_salary);
            rec.pension = formatNumber(rec.pension);
            rec.name = rec.staff_names;
            records.push(rec);
          }

          const totalSalary = salarySum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalConRel = reliefSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalPension = pensionSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalNHIS = nhisSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalLAP = lapSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalNetTax = netTaxSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalExpTax = expTaxSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          sum.totalSalary = totalSalary;
          sum.totalConRel = totalConRel;
          sum.totalPension = totalPension;
          sum.totalNHIS = totalNHIS;
          sum.totalLAP = totalLAP;
          sum.totalNetTax = totalNetTax;
          sum.totalExpTax = totalExpTax;
          setIsFetching(false);
          setPost(() => records);
          setTotal(() => sum);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);
  console.log("Annual sum", total);
  console.log("Posts", post);
  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

  const searchHandler = (e) => {
    setQuery(() => e.target.value.toLowerCase());
  };

  let res = [];
  const search = (rows) => {
    let data = [];
    data = rows.filter((rows) => rows.name.toLowerCase().indexOf(query) > -1);
    res.push(data);
    return data;
  };

  const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);

  const deleteHandler = async () => {
    let year = {
      year: uploadYear,
    };
    setIsFetching(true);
    try {
      let res = await axios.delete(
        `${url.BASE_URL}annual/delete-annual-returns`,
        { data: year }
      );
      setIsFetching(false);
      console.log(res.data);
      alert(res.data.message);
      router.push("/list-annual-returns");
    } catch (e) {
      setIsFetching(false);
      if (e.response) {
        alert(e.response.message);
      }
    }
  };

  const deletePrompt = () => {
    if (
      window.confirm(
        "Are you sure? This action will delete both schedule and supporting documents"
      )
    ) {
      deleteHandler();
    }
  };

  return (
    <>
      {status === "Submitted" || status === "Draft" ? (
        <div className="lg:flex md:flex justify-end">
          <div className="w-32">
            <DeleteButton onClick={() => deletePrompt()}>Delete</DeleteButton>
          </div>
        </div>
      ) : (
        ""
      )}
      <p className="font-bold text-center">
        {" "}
        Year {uploadYear} - {status}
      </p>
      <SectionTitle title="View Uploads" subtitle="Annual PAYE Returns" />
      <div className="flex justify-between m-4">
        <button
          className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
          type="submit"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button
          className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
          type="submit"
        >
          <Link
            legacyBehavior
            href={`/view/annual/docs/${uploadYear}_${status}`}
          >
            {" "}
            View Documents
          </Link>
        </button>
      </div>
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
        <div className="flex lg:flex-wrap w-full lg:space-x-4 justify-between items-center">
          <div className="w-32">
            <NewFormInput
              label="Search by name"
              required
              onChange={searchHandler}
            />
          </div>
        </div>
        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewAnnualTableSingle remittance={searchedPost} total={total} />
              <CustomPagination
                paginate={paginate}
                totalPosts={res[0].length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          ) : (
            <>
              <ViewAnnualTableSingle remittance={currentPosts} total={total} />
              <CustomPagination
                paginate={paginate}
                totalPosts={post.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          )}
        </div>
      </Widget>
    </>
  );
};

export default ViewAnnualSingle;
