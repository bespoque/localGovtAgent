import ContentLoader from "react-content-loader";

const RecentPressLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={373}
      backgroundColor={"#ffffff"}
      {...props}
    >
      <rect x="-2" y="34" rx="2" ry="2" width="100%" height="373" />
    </ContentLoader>
  );
};

export default RecentPressLoader;
