import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';



SwiperCore.use([Autoplay])
const swiper = () => {
  
  return (
    <>
      
      <div>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={
          { delay: 2000 }
        }
      >
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
        <SwiperSlide>{slid()}</SwiperSlide>
      </Swiper>

      </div>

      
    </>
  );
};
function slid() {
  return (
    <>
      <div className='border-2 border-black rounded-lg h-fit text-black'>
        hello
      </div>
    </>
  )
}
export default swiper;