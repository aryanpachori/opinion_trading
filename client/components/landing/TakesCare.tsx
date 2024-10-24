import React from "react";
import WhyChooseUsCard from "../ui/takes-care";

const TakesCareWrapper = () => {
  return (
    <div className="relative flex justify-center items-center flex-col gap-5 md:gap-0 overflow-hidden p-10 md:w-2/3">
      <div
        className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
      </div>
      <div className="mx-auto w-full text-center animate-fade-up inline-block bg-clip-text mb-3 md:mb-0">
        <h1 className=" lg:mt-8 mt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60 md:mt-0 md:-mb-8 flex justify-center w-full items-center gap-1 sm:gap-4 h-[5rem] md:h-[4rem] lg:h-[16rem] sm:text-[5rem] lg:text-[30px] xl:text-[50px] text-[2.2rem]">
          <span>Takes</span>
          <span>Care</span>
          <span>of?</span>
        </h1>
      </div>
      <WhyChooseUsCard
        title="Fastest news feed in the gamer"
        description="Probo is all about understanding the world around us and bene fitting from our knowledge. Everything on Probo is based on real events that you can learn about, verify and follow yourself."
        svg={
          <svg
            width="144"
            height="144"
            viewBox="0 0 144 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_di_326_101)">
              <path
                d="M72 12C73.15 12 74.3 12.2356 75.35 12.6834L122.425 31.5129C127.925 33.7046 132.025 38.8185 132 44.9929C131.875 68.3707 121.675 111.144 78.6 130.586C74.425 132.471 69.575 132.471 65.4 130.586C22.3252 111.144 12.1251 68.3707 12.0001 44.9929C11.9751 38.8185 16.0751 33.7046 21.5751 31.5129L68.675 12.6834C69.7 12.2356 70.85 12 72 12ZM72 27.7423V116.823C106.5 101.081 115.775 66.2262 116 45.3228L72 27.7423Z"
                fill="url(#paint0_linear_326_101)"
              />
            </g>
            <defs>
              <filter
                id="filter0_di_326_101"
                x="0.7"
                y="0.699939"
                width="142.6"
                height="142.6"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="white"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="5.65" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_326_101"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_326_101"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="7.1" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_326_101"
                />
              </filter>
              <linearGradient
                id="paint0_linear_326_101"
                x1="72"
                y1="12"
                x2="72"
                y2="132"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#B591E9" />
                <stop offset="0.51" stop-color="#8489F5" />
                <stop offset="1" stop-color="#8448DA" />
              </linearGradient>
            </defs>
          </svg>
        }
      />
      <WhyChooseUsCard
        title="All the news without the noise"
        description="Our experts go through tons of information to get to the very core of a world event. They help you develop not only an opinion about events but also a better understanding of the world around us."
        svg={
          <svg
            width="173"
            height="173"
            viewBox="0 0 173 173"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_323_77)">
              <g filter="url(#filter1_i_323_77)">
                <path
                  d="M151.375 75.6875C151.375 105.545 127.17 129.75 97.3125 129.75C67.4546 129.75 43.25 105.545 43.25 75.6875C43.25 45.8296 67.4546 21.625 97.3125 21.625C127.17 21.625 151.375 45.8296 151.375 75.6875Z"
                  fill="#8887E6"
                />
              </g>
              <g filter="url(#filter2_bii_323_77)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M75.6875 151.375C105.545 151.375 129.75 127.17 129.75 97.3124C129.75 67.4545 105.545 43.2499 75.6875 43.2499C45.8296 43.2499 21.625 67.4545 21.625 97.3124C21.625 127.17 45.8296 151.375 75.6875 151.375ZM103.001 89.576C106.193 86.4341 106.234 81.2997 103.092 78.1079C99.9498 74.9162 94.8153 74.8758 91.6236 78.0176L68.4791 100.8L59.7513 92.2091C56.5596 89.0672 51.4252 89.1076 48.2833 92.2994C45.1414 95.4911 45.1819 100.626 48.3736 103.767L62.7903 117.959C65.9465 121.066 71.0117 121.066 74.168 117.959L103.001 89.576Z"
                  fill="white"
                  fill-opacity="0.4"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_323_77"
                x="15.5486"
                y="15.5486"
                width="154.056"
                height="154.056"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="6.07639" dy="6.07639" />
                <feGaussianBlur stdDeviation="6.07639" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.760877 0 0 0 0 0.758333 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_323_77"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_323_77"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_i_323_77"
                x="43.25"
                y="21.625"
                width="108.125"
                height="108.125"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="6.07639" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_323_77"
                />
              </filter>
              <filter
                id="filter2_bii_323_77"
                x="15.5486"
                y="37.1735"
                width="120.278"
                height="120.278"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur
                  in="BackgroundImageFix"
                  stdDeviation="3.03819"
                />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_323_77"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_323_77"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="3.03819" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_323_77"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="6.07639" />
                <feGaussianBlur stdDeviation="6.07639" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect2_innerShadow_323_77"
                  result="effect3_innerShadow_323_77"
                />
              </filter>
            </defs>
          </svg>
        }
        reverse
      />

      <WhyChooseUsCard
        title="The power to exit trades, anytime"
        description="Probo is an opinion trading platform. And, like a true trading platform, Probo gives you the power to exit. You can withdraw from a trade, if it’s not going in the direction you thought it will go."
        svg={
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_di_331_139)">
              <path
                d="M105.322 14.4947C103.56 12.2909 103.56 8.72715 105.322 6.54672C107.085 4.36628 109.936 4.34284 111.68 6.54672L123.681 21.5518C124.525 22.6069 124.994 24.0371 124.994 25.5376C124.994 27.0381 124.525 28.4683 123.681 29.5233L111.68 44.5284C109.917 46.7323 107.066 46.7323 105.322 44.5284C103.578 42.3246 103.56 38.7608 105.322 36.5804L109.635 31.1879L77.0054 31.1411C74.5112 31.1411 72.5047 28.6324 72.5047 25.5141C72.5047 22.3959 74.5112 19.8872 77.0054 19.8872H109.654L105.322 14.4947ZM24.6847 93.2717L20.3715 98.6641H53.0016C55.4958 98.6641 57.5023 101.173 57.5023 104.291C57.5023 107.409 55.4958 109.918 53.0016 109.918H20.3528L24.666 115.31C26.4287 117.514 26.4287 121.078 24.666 123.258C22.9032 125.439 20.0527 125.462 18.3087 123.258L6.30685 108.277C5.46296 107.222 4.99414 105.792 4.99414 104.291C4.99414 102.791 5.46296 101.36 6.30685 100.305L18.3087 85.3002C20.0715 83.0963 22.9219 83.0963 24.666 85.3002C26.41 87.5041 26.4287 91.0678 24.666 93.2482L24.6847 93.2717ZM22.997 19.8872H68.3603C67.6664 21.5753 67.2539 23.4744 67.2539 25.5141C67.2539 32.243 71.6233 37.7058 77.0054 37.7058H99.0213C98.2712 41.6915 99.1339 46.029 101.609 49.1472C105.416 53.9066 111.586 53.9066 115.393 49.1472L119.012 44.6222V94.9128C119.012 103.189 113.63 109.918 107.01 109.918H61.6467C62.3406 108.23 62.7532 106.331 62.7532 104.291C62.7532 97.5622 58.3837 92.0994 53.0016 92.0994H30.9857C31.7358 88.1136 30.8732 83.7762 28.3978 80.658C24.591 75.8985 18.4212 75.8985 14.6144 80.658L10.9951 85.183V34.8923C10.9951 26.6161 16.3772 19.8872 22.997 19.8872ZM34.9988 34.8923H22.997V49.8975C29.6167 49.8975 34.9988 43.1686 34.9988 34.8923ZM107.01 79.9077C100.39 79.9077 95.0082 86.6366 95.0082 94.9128H107.01V79.9077ZM65.0035 87.4103C69.7782 87.4103 74.3572 85.0389 77.7334 80.8179C81.1096 76.5969 83.0063 70.872 83.0063 64.9026C83.0063 58.9332 81.1096 53.2083 77.7334 48.9873C74.3572 44.7662 69.7782 42.3949 65.0035 42.3949C60.2289 42.3949 55.6498 44.7662 52.2736 48.9873C48.8974 53.2083 47.0007 58.9332 47.0007 64.9026C47.0007 70.872 48.8974 76.5969 52.2736 80.8179C55.6498 85.0389 60.2289 87.4103 65.0035 87.4103Z"
                fill="url(#paint0_linear_331_139)"
              />
            </g>
            <defs>
              <filter
                id="filter0_di_331_139"
                x="0.69414"
                y="0.602588"
                width="128.6"
                height="128.6"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2.15" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_331_139"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_331_139"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="8.15" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_331_139"
                />
              </filter>
              <linearGradient
                id="paint0_linear_331_139"
                x1="14.4941"
                y1="9.40258"
                x2="112.994"
                y2="121.903"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
            </defs>
          </svg>
        }
      />

      <WhyChooseUsCard
        title="The pulse of society is on Probo"
        description="Besides helping you learn important financial & trading skills, Probo also helps you understand the collective thoughts of Indians. Knowledge that is crucial for the betterment of our country."
        svg={
          <svg
            width="206"
            height="147"
            viewBox="0 0 206 147"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="35"
              y="25"
              width="160"
              height="100"
              rx="20"
              fill="url(#paint0_linear_326_127)"
            />
            <mask
              id="mask0_326_127"
              maskUnits="userSpaceOnUse"
              x="35"
              y="25"
              width="160"
              height="100"
            >
              <rect
                x="35"
                y="25"
                width="160"
                height="100"
                rx="20"
                fill="url(#paint1_linear_326_127)"
              />
            </mask>
            <g mask="url(#mask0_326_127)">
              <g filter="url(#filter0_d_326_127)">
                <path
                  d="M95 45.0001C95 67.0915 77.0914 85.0001 55 85.0001C32.9086 85.0001 15 67.0915 15 45.0001C15 22.9087 32.9086 5.00012 55 5.00012C77.0914 5.00012 95 22.9087 95 45.0001Z"
                  fill="url(#paint2_linear_326_127)"
                />
                <path
                  d="M105 120C105 133.807 82.6142 145 55 145C27.3858 145 5 133.807 5 120C5 106.193 27.3858 95.0001 55 95.0001C82.6142 95.0001 105 106.193 105 120Z"
                  fill="url(#paint3_linear_326_127)"
                />
                <path
                  d="M115 55.0001C115 49.4773 119.477 45.0001 125 45.0001H195C200.523 45.0001 205 49.4773 205 55.0001C205 60.523 200.523 65.0001 195 65.0001H125C119.477 65.0001 115 60.523 115 55.0001Z"
                  fill="url(#paint4_linear_326_127)"
                />
                <path
                  d="M115 95.0001C115 89.4773 119.477 85.0001 125 85.0001H155C160.523 85.0001 165 89.4773 165 95.0001C165 100.523 160.523 105 155 105H125C119.477 105 115 100.523 115 95.0001Z"
                  fill="url(#paint5_linear_326_127)"
                />
              </g>
            </g>
            <g filter="url(#filter1_bii_326_127)">
              <path
                d="M95 45C95 67.0914 77.0914 85 55 85C32.9086 85 15 67.0914 15 45C15 22.9086 32.9086 5 55 5C77.0914 5 95 22.9086 95 45Z"
                fill="url(#paint6_linear_326_127)"
                fill-opacity="0.1"
              />
              <path
                d="M105 120C105 133.807 82.6142 145 55 145C27.3858 145 5 133.807 5 120C5 106.193 27.3858 95 55 95C82.6142 95 105 106.193 105 120Z"
                fill="url(#paint7_linear_326_127)"
                fill-opacity="0.1"
              />
              <path
                d="M115 55C115 49.4772 119.477 45 125 45H195C200.523 45 205 49.4772 205 55C205 60.5228 200.523 65 195 65H125C119.477 65 115 60.5228 115 55Z"
                fill="url(#paint8_linear_326_127)"
                fill-opacity="0.1"
              />
              <path
                d="M115 95C115 89.4772 119.477 85 125 85H155C160.523 85 165 89.4772 165 95C165 100.523 160.523 105 155 105H125C119.477 105 115 100.523 115 95Z"
                fill="url(#paint9_linear_326_127)"
                fill-opacity="0.1"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_326_127"
                x="-2"
                y="-1.99988"
                width="224"
                height="164"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="6" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.1925 0 0 0 0 0.26993 0 0 0 0 0.9625 0 0 0 0.5 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_326_127"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_326_127"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_bii_326_127"
                x="-15"
                y="-15"
                width="240"
                height="180"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_326_127"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_326_127"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="10" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_326_127"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-10" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.803922 0 0 0 0 0.843137 0 0 0 0 0.980392 0 0 0 0.15 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect2_innerShadow_326_127"
                  result="effect3_innerShadow_326_127"
                />
              </filter>
              <linearGradient
                id="paint0_linear_326_127"
                x1="47.6667"
                y1="28.75"
                x2="117.412"
                y2="156.203"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_326_127"
                x1="47.6667"
                y1="28.75"
                x2="117.412"
                y2="156.203"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_326_127"
                x1="20.8333"
                y1="10.2501"
                x2="124.137"
                y2="178.802"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_326_127"
                x1="20.8333"
                y1="10.2501"
                x2="124.137"
                y2="178.802"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_326_127"
                x1="20.8333"
                y1="10.2501"
                x2="124.137"
                y2="178.802"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_326_127"
                x1="20.8333"
                y1="10.2501"
                x2="124.137"
                y2="178.802"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CCE8FE" />
                <stop offset="0.241554" stop-color="#CDA0FF" />
                <stop offset="0.4" stop-color="#8489F5" />
                <stop offset="0.713254" stop-color="#CDF1FF" />
                <stop offset="1" stop-color="#B591E9" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_326_127"
                x1="5.00001"
                y1="5.00009"
                x2="217.082"
                y2="123.349"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CDD7FA" />
                <stop offset="1" stop-color="#3D4FF0" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_326_127"
                x1="5.00001"
                y1="5.00009"
                x2="217.082"
                y2="123.349"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CDD7FA" />
                <stop offset="1" stop-color="#3D4FF0" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_326_127"
                x1="5.00001"
                y1="5.00009"
                x2="217.082"
                y2="123.349"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CDD7FA" />
                <stop offset="1" stop-color="#3D4FF0" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_326_127"
                x1="5.00001"
                y1="5.00009"
                x2="217.082"
                y2="123.349"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#CDD7FA" />
                <stop offset="1" stop-color="#3D4FF0" />
              </linearGradient>
            </defs>
          </svg>
        }
        reverse
      />
    </div>
  );
};

export default TakesCareWrapper;