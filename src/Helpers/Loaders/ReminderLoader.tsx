import ContentLoader from 'react-content-loader'

const ReminderLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={460}
    // viewBox={"0 0 100vw 460"}
    backgroundColor={'#ffffff'}
    {...props}
  >
    <rect x='-2' y='34' rx='2' ry='2' width='100%' height='100' />
    <rect x='-2' y='154' rx='2' ry='2' width='100%' height='100' />
    <rect x='-2' y='274' rx='2' ry='2' width='100%' height='100' />
    <rect x='-2' y='384' rx='2' ry='2' width='100%' height='100' />
    <rect x='-2' y='494' rx='2' ry='2' width='100%' height='100' />
  </ContentLoader>
)

ReminderLoader.metadata = {
  name: 'Didier Munezero',
  github: 'didiermunezero',
  description: 'Grid for content of head and body',
  filename: 'HeadBodyGrid',
}

export default ReminderLoader
