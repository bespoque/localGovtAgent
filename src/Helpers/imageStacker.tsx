import Avatar from 'react-avatar'

interface ImageStackerInterface {
    arr: string[]
    title: string
}

const ImageStacker = ({ arr, title }: ImageStackerInterface) => {


    return (
        <div className='imageStacker d-flex flex-column flex-fill'>
            <div className='imageTitle'>
                {title}
            </div>
            <div className='d-flex flex-row justify-content-md-between justify-content-lg-between '>
                <div className='ImageStackerImgCon'>

                    {arr?.slice?.(0, 4).map((i: any, id: number) => (
                            <Avatar
                                size='40px'
                                textSizeRatio={2.5}
                                color='#6554c0'
                                key={Math.random()}
                                round={true}
                                className={`imgStackerImg${id} cursor-pointer font-weight-bolder`}
                                name={`${i?.employee?.firstName} ${i?.employee?.surname}`}
                            />
                    ))}
                    {/* {arr?.slice?.(0, 4).map((i: any, id: number) => (
                        <img key={Math.random()} className={`imgStackerImg${id}`} width={32} src={i} alt="profile" />
                    ))} */}
                </div>
                {arr.length > 3 && <div className=''>
                    <span className='others mr-3'> + {arr?.length - 3} {arr.length <= 3 ? `` : arr.length - 3 === 1 ? `other` : `others`}</span>
                </div>}
            </div>
        </div>
    )
}

export default ImageStacker