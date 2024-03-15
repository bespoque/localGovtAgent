import ContentLoader from 'react-content-loader'

const TableLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'100%'}
    // viewBox={"0 0 100vw 460"}
    backgroundColor={'#ffffff'}
    {...props}
  >
   
    <rect x='-2' y='30' rx='2' ry='2' width='100%' height='160' />
    <rect x='-2' y='200' rx='2' ry='2' width='100%' height='160' />
    <rect x='-2' y='370' rx='2' ry='2' width='100%' height='160' />
    <rect x='-2' y='540' rx='2' ry='2' width='100%' height='160' />
    <rect x='-2' y='710' rx='2' ry='2' width='100%' height='160' />
  </ContentLoader>
)

TableLoader.metadata = {
  name: 'Didier Munezero',
  github: 'didiermunezero',
  description: 'Grid for content of head and body',
  filename: 'HeadBodyGrid',
}

export default TableLoader
