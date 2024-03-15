import ContentLoader from "react-content-loader";

const OkrCardLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={460}
      // viewBox={"0 0 100vw 460"}
      backgroundColor={"#ffffff"}
      {...props}
    >
      <rect x="-2" y="34" rx="2" ry="2" width="10%" height="48" />
      <rect x="2372" y="34" rx="-2" ry="-2" width="10%" height="48" />
      <rect x="4" y="100" rx="2" ry="2" width="100%" height="343" />
    </ContentLoader>
  );
};

export default OkrCardLoader;
