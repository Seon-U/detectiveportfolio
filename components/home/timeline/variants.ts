/** 타임라인 애니메이션 variants */

export const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.3, ease: "easeOut" as const },
  }),
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.06,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

export const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
