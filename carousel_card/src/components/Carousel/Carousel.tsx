import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import styles from "./carousel.module.css";

interface CardProps {
  id: string;
  title: string;
  color: string;
}

interface AnimationProps {
  height?: string;
  width?: string;
  scale?: number;
  translateX?: string | number;
  zIndex?: number;
  top?: string | number;
}

const listOfCards: CardProps[] = [
  { id: "1", title: "CARD #1", color: "green" },
  { id: "2", title: "CARD #2", color: "brown" },
  { id: "3", title: "CARD #3", color: "red" },
  { id: "4", title: "CARD #4", color: "black" },
  { id: "5", title: "CARD #5", color: "blue" },
  { id: "6", title: "CARD #6", color: "purple" },
];

const animatedData = (index: number): AnimationProps => {
  const defaultAnimation: AnimationProps = {
    height: "0",
    width: "0",
    scale: 0,
    translateX: 0,
    zIndex: 0,
    top: 0,
  };

  return (
    {
      0: {
        height: "340px",
        width: "350px",
        scale: 1,
        translateX: 0,
        zIndex: 3,
        top: 0,
      },
      1: {
        height: "300px",
        width: "300px",
        scale: 1,
        translateX: "200px",
        zIndex: 2,
        top: "20px",
      },
      2: {
        height: "270px",
        width: "300px",
        scale: 1,
        translateX: "330px",
        zIndex: 1,
        top: "40px",
      },
      3: defaultAnimation,
      4: defaultAnimation,
      5: defaultAnimation,
      6: defaultAnimation,
    }[index] || defaultAnimation
  );
};

const Product: React.FC<{ index: number; item: CardProps }> = ({
  item,
  index,
}) => {
  return (
    <motion.div
      key={item?.id}
      animate={animatedData(index)}
      style={{ backgroundColor: item?.color }}
      className={styles.card}
    >
      <p className={styles.card_title}>{item?.title}</p>
    </motion.div>
  );
};

const Carousel: React.FC = () => {
  const [cards, setCards] = useState(listOfCards);

  const handleNext = useCallback(() => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  const handlePrev = useCallback(() => {
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  }, []);

  return (
    <div className={styles.carousel_wrapper}>
      <div className={styles.carousel_stack}>
        {!!cards.length &&
          cards.map((card, index) => (
            <Product key={card.id} item={card} index={index} />
          ))}
      </div>
      <div className={styles.navigation_buttons}>
        <span
          onClick={handlePrev}
          className={`${styles.btn} ${styles.btn_prev}`}
        >
          <ArrowLeftOutlined className={styles.icon} />
        </span>
        <span
          onClick={handleNext}
          className={`${styles.btn} ${styles.btn_next}`}
        >
          <ArrowRightOutlined className={styles.icon} />
        </span>
      </div>
    </div>
  );
};

export default Carousel;
