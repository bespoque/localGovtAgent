import ContentLoader from "react-content-loader";

const FullPageLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={350}
      backgroundColor={"#ffffff"}
      {...props}
    >
      <rect x="-2" y="" rx="2" ry="2" width="100vw" height="80vh" />
    </ContentLoader>
  );
};

export default FullPageLoader;
