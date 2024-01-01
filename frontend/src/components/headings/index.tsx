import tw from 'tailwind-styled-components';

const HeadingXL = tw.h1`
    font-bold 
    text-[24px] 
    text-dark
    leading-[30px]
    
    dark:text-white
`;

const HeadingL = tw.h2`
    font-bold
    text-[18px]
    text-dark
    leading-[23px]
    
    dark:text-white
`;

const HeadingM = tw.h3`
    font-bold
    text-[15px]
    text-dark
    leading-[19px]
    
    dark:text-white
`;

const HeadingS = tw.h4`
    font-bold 
    text-[12px] 
    leading-[15px] 
    tracking-[2.4px]
    text-medium-gray
`;

export { HeadingXL, HeadingL, HeadingM, HeadingS };
