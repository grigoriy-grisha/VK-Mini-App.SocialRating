function RatingBottom() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
            <g filter="url(#filter0_bii_2747_974)">
                <path d="M17 17L21 12M17 17L13 12M17 17V1M1 17H10M1 12H9M1 6H8M6 1H1" stroke="url(#paint0_linear_2747_974)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <filter id="filter0_bii_2747_974" x="-2.2" y="-2.2" width="26.4" height="22.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.1"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2747_974"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2747_974" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="-1.1" dy="1.1"/>
                    <feGaussianBlur stdDeviation="0.55"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2747_974"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="1.1" dy="-1.1"/>
                    <feGaussianBlur stdDeviation="0.55"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.433647 0 0 0 0 0.190745 0 0 0 0 0.467922 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect2_innerShadow_2747_974" result="effect3_innerShadow_2747_974"/>
                </filter>
                <linearGradient id="paint0_linear_2747_974" x1="2.66667" y1="-15.5333" x2="18.0909" y2="28.6815" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#CC87ED" stopOpacity="0.35"/>
                    <stop offset="1" stopColor="#FF0089" stopOpacity="0.86"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

export default RatingBottom;
