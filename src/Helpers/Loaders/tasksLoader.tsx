import ContentLoader from 'react-content-loader'

const TableLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'120px'}
    style={{ marginBottom: '24px' }}
    // viewBox={"0 0 100vw 460"}
    backgroundColor={'#ffffff'}
    {...props}
  >
    <rect x='0' y='0' rx='2' ry='2' width='100%' height='100%' />
  </ContentLoader>
)

TableLoader.metadata = {
  name: 'Didier Munezero',
  github: 'didiermunezero',
  description: 'Grid for content of head and body',
  filename: 'HeadBodyGrid',
}

export default TableLoader
