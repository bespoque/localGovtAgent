import ContentLoader from 'react-content-loader'

const TableLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'70vh'}
    // viewBox={"0 0 100vw 460"}
    backgroundColor={'#ffffff'}
    {...props}
  >
    <rect x='0' y='34' rx='2' ry='2' width='100%' height='50vh' />
  </ContentLoader>
)

TableLoader.metadata = {
  name: 'Didier Munezero',
  github: 'didiermunezero',
  description: 'Grid for content of head and body',
  filename: 'HeadBodyGrid',
}

export default TableLoader
