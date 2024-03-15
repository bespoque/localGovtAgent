import ContentLoader from "react-content-loader";

 const LineLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={40}
    backgroundColor={"#ffffff"}
    {...props}
  >
    <rect x="-2" y="34" rx="2" ry="2" width="100%" height="45" />
  </ContentLoader>
);



export default LineLoader;