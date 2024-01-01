import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice.ts';
import tw from 'tailwind-styled-components';
import React, { ChangeEvent, PropsWithChildren, useState } from 'react';
import Select from 'react-select';
import * as classNames from 'classnames';
import {
    HeadingL,
    HeadingM,
    HeadingS,
    HeadingXL,
} from '../../components/headings';
import { BodyL, BodyM } from '../../components/body-types';

type buttonTypes = 'primary' | 'secondary' | 'destructive';
type buttonSizes = 'small' | 'regular';
interface ButtonProps {
    type: buttonTypes;
    size: buttonSizes;
    [key: string]: any;
}

interface StyledButtonProps {
    $type: buttonTypes;
    $size: buttonSizes;
}
const ButtonStyled = tw.button<StyledButtonProps>`
    text-white
    font-bold
    
    
    ${(p) => (p.$size === 'regular' ? 'text-[15px]' : '')}
    ${(p) => (p.$size === 'small' ? 'text-[13px]' : '')}
    
    
    ${(p) => (p.$size === 'regular' ? 'rounded-[24px]' : '')}
    ${(p) => (p.$size === 'small' ? 'rounded-[20px]' : '')}
    
    ${(p) => (p.$size === 'regular' ? 'p-[15px]' : '')}
    ${(p) => (p.$size === 'small' ? 'p-[8px]' : '')}
    
    
    ${(p) => (p.$type === 'primary' ? 'bg-primary' : '')}
    ${(p) => (p.$type === 'primary' ? 'hover:bg-primary-lighter' : '')}
    ${(p) => (p.$type === 'primary' ? 'focus:bg-primary-lighter' : '')}
    
    ${(p) => (p.$type === 'secondary' ? 'bg-secondary' : '')}
    ${(p) => (p.$type === 'secondary' ? 'dark:bg-white' : '')}
    ${(p) => (p.$type === 'secondary' ? 'text-primary' : '')}
    ${(p) => (p.$type === 'secondary' ? 'hover:bg-secondary-active' : '')}
    ${(p) => (p.$type === 'secondary' ? 'focus:bg-secondary-active' : '')}
    
        
    ${(p) => (p.$type === 'destructive' ? 'bg-danger' : '')}
    ${(p) => (p.$type === 'destructive' ? 'hover:bg-danger-lighter' : '')}
    ${(p) => (p.$type === 'destructive' ? 'focus:bg-danger-lighter' : '')}
    
    
`;
function Button({
    type,
    children,
    size,
    ...rest
}: ButtonProps & PropsWithChildren) {
    return (
        <ButtonStyled $type={type} {...rest} $size={size}>
            <div className=""></div>
            {children}
        </ButtonStyled>
    );
}

interface InputStyledProps {
    $errorMessage?: string;
}
const InputStyled = tw.input<InputStyledProps>`
    focus:outline-none
    px-4
    py-2
    rounded-[4px]
    border
    border-input-border
    w-full
    
    dark:bg-transparent
    dark:text-white
    
    focus:border-gray
    dark:focus:border-medium-gray
    
    ${(p) => (p.$errorMessage ? 'border-danger' : '')}
    ${(p) => (p.$errorMessage ? 'focus:border-red-600' : '')}
    ${(p) => (p.$errorMessage ? 'dark:focus:border-red-600' : '')}
  
`;

interface TextInputProps {
    placeholder?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    [key: string]: any;
}

const ErrorMessage = tw.span`
    absolute
    right-4
    top-[50%]
    -translate-y-1/2
    text-danger
`;

const InputWrapper = tw.div`
    relative
    leading-[23px]
    text-[13px]
`;
function TextInput({
    value,
    placeholder = '',
    onChange = () => {},
    errorMessage = '',
    ...rest
}: TextInputProps) {
    return (
        <InputWrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <InputStyled
                $errorMessage={errorMessage}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                {...rest}
            />
        </InputWrapper>
    );
}

interface CheckboxItemProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
}

const CheckboxLabel = tw.label`
    relative
    hover:cursor-pointer
    bg-light-gray
    
    p-3
    rounded-[4px]
    w-full
    flex
    items-center
    text-[12px]
    font-bold
    text-dark
    
    hover:bg-primary
    hover:bg-opacity-25
    
    focus:bg-primary
    focus:bg-opacity-25
    
    dark:bg-dark-lighter
    dark:text-white
    dark:hover:bg-primary
    dark:hover:bg-opacity-25
`;

const CheckboxInput = tw.input`
    hidden
`;
interface CheckboxBoxStyledProps {
    $isChecked: boolean;
}
const CheckboxTextWrapper = tw.div<CheckboxBoxStyledProps>`
    ml-4
    
    ${(p) => (p.$isChecked ? 'opacity-50' : '')}
    ${(p) => (p.$isChecked ? 'line-through' : '')}
`;

const CheckboxBox = tw.div<CheckboxBoxStyledProps>`
    w-4
    h-4
  
    rounded-[2px]
    border
    border-input-border
    
    flex
    items-center
    justify-center
    
    dark:bg-gray
    
    ${(p) => (p.$isChecked ? 'bg-primary' : 'bg-white')}
    ${(p) => (p.$isChecked ? 'dark:bg-primary' : 'bg-white')}
`;

const checkSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
    >
        <path
            d="M1.27588 3.06593L4.03234 5.82239L9.03234 0.822388"
            stroke="white"
            strokeWidth="2"
        />
    </svg>
);
function SVG({ children, ...props }: any) {
    // Clone the SVG element and merge the props
    const clonedSVG = React.cloneElement(children, { ...children, ...props });

    return <div>{clonedSVG}</div>;
}

function CheckboxItem({
    children,
    isChecked,
    onChange = () => {},
}: CheckboxItemProps & PropsWithChildren) {
    return (
        <CheckboxLabel tabIndex={0}>
            <CheckboxInput
                type={'checkbox'}
                checked={isChecked}
                onChange={onChange}
            />
            <CheckboxBox $isChecked={isChecked}>
                {isChecked && <SVG>{checkSvg}</SVG>}
            </CheckboxBox>
            <CheckboxTextWrapper $isChecked={isChecked}>
                {children}
            </CheckboxTextWrapper>
        </CheckboxLabel>
    );
}

const options = [
    { label: 'apple', value: 1 },
    { label: 'orange', value: 2 },
    { label: 'kiwi', value: 3 },
];

function Playground() {
    const [items, setItems] = useState<{ label: string; value: any }>();

    console.log(items);

    const handleOption = (selections: any) => {
        setItems(selections);
    };
    const mode = useAppSelector((state: RootState) => state.theme.mode);
    const dispatch = useAppDispatch();

    const switchModes = () => {
        dispatch(toggleTheme());
    };
    return (
        <div className="p-6">
            <button onClick={switchModes}>{mode}</button>
            <div className={'my-4'}>
                <HeadingXL>Heading XL</HeadingXL>

                <HeadingL>Heading L</HeadingL>
                <HeadingM>Heading M</HeadingM>

                <HeadingS>Heading S</HeadingS>
            </div>

            <div className={'my-4'}>
                <BodyL>
                    (Body L) - Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit. Phasellus hendrerit. Pellentesque aliquet
                    nibh nec urna. In nisi neque, aliquet vel, dapibus id,
                    mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet
                    viverra, tortor libero sodales leo, eget blandit nunc tortor
                    eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
                    egestas, ante et vulputate volutpat, eros pede semper est,
                    vitae luctus metus libero eu augue. Morbi purus libero,
                    faucibus adipiscing, commodo quis, gravida id, est.
                </BodyL>
            </div>

            <div className={'my-4'}>
                <BodyM>
                    (Body M) - Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit. Phasellus hendrerit. Pellentesque aliquet
                    nibh nec urna. In nisi neque, aliquet vel, dapibus id,
                    mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet
                    viverra, tortor libero sodales leo, eget blandit nunc tortor
                    eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
                    egestas, ante et vulputate volutpat, eros pede semper est,
                    vitae luctus metus libero eu augue. Morbi purus libero,
                    faucibus adipiscing, commodo quis, gravida id, est.
                </BodyM>
            </div>

            <div className={'my-4'}>
                <Button type="primary" size="regular">
                    Primary regular
                </Button>
            </div>
            <div className={'my-4'}>
                <Button type="primary" size="small">
                    Primary small
                </Button>
            </div>

            <div className={'my-4'}>
                <Button type="secondary" size="regular">
                    Secondary regular
                </Button>
            </div>
            <div className={'my-4'}>
                <Button type="secondary" size="small">
                    Secondary small
                </Button>
            </div>

            <div className={'my-4'}>
                <Button type="destructive" size="regular">
                    Destructive regular
                </Button>
            </div>
            <div className={'my-4'}>
                <Button type="destructive" size="small">
                    Destructive small
                </Button>
            </div>

            <div className={'my-4'}>
                <TextInput value={''} placeholder={'Placeholder'} />
            </div>

            <div className={'my-4'}>
                <TextInput value={'sadasd'} placeholder={'Placeholder'} />
            </div>

            <div className={'my-4'}>
                <TextInput
                    value={'sadasd'}
                    placeholder={'Placeholder'}
                    errorMessage={'not good'}
                />
            </div>

            <div className={'my-4'}>
                <CheckboxItem isChecked={false}>not checked</CheckboxItem>
            </div>

            <div className={'my-4'}>
                <CheckboxItem isChecked={true}>checked</CheckboxItem>
            </div>

            <div className={'my-4s'}>
                <Select
                    options={options}
                    onChange={handleOption}
                    menuIsOpen
                    menuPlacement="auto"
                    classNames={{
                        indicatorSeparator: () => 'hidden',
                        control: (state) => {
                            const { isFocused } = state;
                            return classNames(
                                'text-[13px] leading-[23px] text-dark dark:!bg-transparent dark:text-white',
                                {
                                    '!border-25  !outline-none !border-primary':
                                        isFocused,
                                }
                            );
                        },
                        singleValue: () => 'dark:text-white text-dark',
                        option: (state) => {
                            const { isSelected, isFocused } = state;
                            return classNames(
                                '!text-medium-gray !text-[13px] !leading-[23px] hover:bg-primary-lighter hover:bg-opacity-25',
                                {
                                    '!bg-primary-lighter !bg-opacity-50':
                                        isSelected || isFocused,
                                }
                            );
                        },
                        menu: () =>
                            'bg-transparent dark:bg-dark-lighter text-medium-gray rounded-4',
                    }}
                    // styles={{
                    //     indicatorSeparator: () => ({
                    //         ...baseStyles,
                    //         display: 'none',
                    //     }),
                    // }}
                />
            </div>
        </div>
    );
}

export default Playground;
