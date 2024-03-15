import ContentLoader from "react-content-loader";

const JobFullDetailsLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#ffffff"}
      {...props}
    >
      <rect
        x="2"
        y="34"
        rx="2"
        ry="2"
        width="100%"
        height="80vh"
      />
    </ContentLoader>
  );
};

export default JobFullDetailsLoader;
