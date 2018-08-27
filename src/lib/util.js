export const isMobileViewport = () => {
    const viewport = window.innerWidth;
    console.log({ viewport });
    return viewport <= 992;
};
