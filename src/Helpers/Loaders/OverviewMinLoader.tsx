import ContentLoader from "react-content-loader";

const OverviewMiniLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={150}
      backgroundColor={"#ffffff"}
      {...props}
    >
      <rect x="2" y="34" rx="2" ry="2" width="100%" height="250" />
    </ContentLoader>
  );
};

export default OverviewMiniLoader;
