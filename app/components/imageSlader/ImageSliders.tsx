import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './ImagesSlider.module.css';

export default function ImageSliders({ images }) {
    return (
        <div className={styles["slider-container"]}>
            <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} modules={[Pagination, Navigation]}>
                {images.map((photo, idx) => {
                    return <SwiperSlide key={idx}>
                        <img src={photo} alt="car" className={styles["slider-image"]} />
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    );
};