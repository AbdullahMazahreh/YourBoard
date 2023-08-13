import React, { Fragment, useContext } from "react";
import "./sidebar.css";
import { BoardNavigater } from "../Index";
import { context } from "../../context/ContextProvider";

function SideBar({ boards, setDisplayPopUp, setDisplaySideBar }) {
  const { isDarkTheme, setIsDarkTheme } = useContext(context);

  const handleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const displayUserBoards = boards.map((ele) => {
    return <BoardNavigater board={ele} key={ele._id} />;
  });

  return (
    <Fragment>
      <aside
        className={
          isDarkTheme ? "sidebar-container dark-theme" : "sidebar-container"
        }
      >
        <div className="allboards-container">
          <div
            className={
              isDarkTheme ? "allboards-title dark-theme" : "allboards-title"
            }
          >
            ALL BOARDS ( {boards.length} )
          </div>
          <div className="allboards-boards">{displayUserBoards}</div>
          <div
            className="allboards-addnewboard"
            onClick={() => setDisplayPopUp(true)}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6.75C3 5.75544 3.39509 4.80161 4.09835 4.09835C4.80161 3.39509 5.75544 3 6.75 3H21.25C22.2446 3 23.1984 3.39509 23.9017 4.09835C24.6049 4.80161 25 5.75544 25 6.75V21.25C25 22.2446 24.6049 23.1984 23.9017 23.9017C23.1984 24.6049 22.2446 25 21.25 25H6.75C5.75544 25 4.80161 24.6049 4.09835 23.9017C3.39509 23.1984 3 22.2446 3 21.25V6.75ZM4.5 14.5V21.25C4.5 21.8467 4.73705 22.419 5.15901 22.841C5.58097 23.2629 6.15326 23.5 6.75 23.5H16V14.5H4.5ZM16 13V4.5H6.75C6.15326 4.5 5.58097 4.73705 5.15901 5.15901C4.73705 5.58097 4.5 6.15326 4.5 6.75V13H16ZM21.25 23.5C21.8467 23.5 22.419 23.2629 22.841 22.841C23.2629 22.419 23.5 21.8467 23.5 21.25V18H17.5V23.5H21.25ZM23.5 16.5V11.5H17.5V16.5H23.5ZM17.5 4.5V10H23.5V6.75C23.5 6.15326 23.2629 5.58097 22.841 5.15901C22.419 4.73705 21.8467 4.5 21.25 4.5H17.5Z"
                fill="#66648c"
              />
            </svg>
            + Create New Board
          </div>
        </div>
        <div className="sidebar-bottom-part">
          <div
            className={
              isDarkTheme
                ? "darktheme-toggler-container dark-theme"
                : "darktheme-toggler-container"
            }
          >
            <div className="darktheme-toggler">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_219_11)">
                  <path
                    d="M12 19C12.2652 19 12.5196 19.1054 12.7071 19.2929C12.8946 19.4804 13 19.7348 13 20V21C13 21.2652 12.8946 21.5196 12.7071 21.7071C12.5196 21.8946 12.2652 22 12 22C11.7348 22 11.4804 21.8946 11.2929 21.7071C11.1053 21.5196 11 21.2652 11 21V20C11 19.7348 11.1053 19.4804 11.2929 19.2929C11.4804 19.1054 11.7348 19 12 19ZM18.364 16.95L19.071 17.657C19.2531 17.8456 19.3539 18.0982 19.3517 18.3604C19.3494 18.6226 19.2442 18.8734 19.0588 19.0588C18.8734 19.2442 18.6226 19.3494 18.3604 19.3517C18.0982 19.354 17.8456 19.2532 17.657 19.071L16.95 18.364C16.7678 18.1754 16.667 17.9228 16.6693 17.6606C16.6716 17.3984 16.7768 17.1476 16.9622 16.9622C17.1476 16.7768 17.3984 16.6716 17.6606 16.6693C17.9228 16.667 18.1754 16.7678 18.364 16.95ZM5.63599 16.95C5.81595 16.7707 6.05743 16.6665 6.31137 16.6588C6.56532 16.651 6.8127 16.7402 7.00327 16.9082C7.19384 17.0763 7.3133 17.3106 7.33739 17.5635C7.36148 17.8164 7.2884 18.069 7.13299 18.27L7.04999 18.364L6.34299 19.071C6.16303 19.2503 5.92156 19.3545 5.66761 19.3622C5.41366 19.37 5.16628 19.2808 4.97571 19.1128C4.78515 18.9447 4.66569 18.7104 4.64159 18.4575C4.6175 18.2046 4.69058 17.952 4.84599 17.751L4.92899 17.657L5.63599 16.95ZM12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88257 17.3679 7.75735 16.2426C6.63213 15.1174 5.99999 13.5913 5.99999 12C5.99999 10.4087 6.63213 8.88258 7.75735 7.75736C8.88257 6.63214 10.4087 6 12 6ZM3.99999 11C4.25487 11.0003 4.50002 11.0979 4.68536 11.2728C4.8707 11.4478 4.98223 11.687 4.99716 11.9414C5.0121 12.1958 4.92932 12.4464 4.76573 12.6418C4.60214 12.8373 4.37009 12.9629 4.11699 12.993L3.99999 13H2.99999C2.74511 12.9997 2.49996 12.9021 2.31462 12.7272C2.12929 12.5522 2.01776 12.313 2.00282 12.0586C1.98788 11.8042 2.07067 11.5536 2.23426 11.3582C2.39785 11.1627 2.62989 11.0371 2.88299 11.007L2.99999 11H3.99999ZM21 11C21.2652 11 21.5196 11.1054 21.7071 11.2929C21.8946 11.4804 22 11.7348 22 12C22 12.2652 21.8946 12.5196 21.7071 12.7071C21.5196 12.8946 21.2652 13 21 13H20C19.7348 13 19.4804 12.8946 19.2929 12.7071C19.1053 12.5196 19 12.2652 19 12C19 11.7348 19.1053 11.4804 19.2929 11.2929C19.4804 11.1054 19.7348 11 20 11H21ZM4.92899 4.929C5.10118 4.75682 5.33028 4.65339 5.57331 4.63811C5.81634 4.62283 6.05659 4.69675 6.24899 4.846L6.34299 4.929L7.04999 5.636C7.22934 5.81596 7.33346 6.05743 7.34122 6.31138C7.34897 6.56533 7.25978 6.81271 7.09174 7.00328C6.92371 7.19384 6.68944 7.31331 6.43652 7.3374C6.18359 7.36149 5.93098 7.28841 5.72999 7.133L5.63599 7.05L4.92899 6.343C4.74152 6.15547 4.6362 5.90116 4.6362 5.636C4.6362 5.37084 4.74152 5.11653 4.92899 4.929ZM19.071 4.929C19.2585 5.11653 19.3638 5.37084 19.3638 5.636C19.3638 5.90116 19.2585 6.15547 19.071 6.343L18.364 7.05C18.2717 7.14551 18.1614 7.22169 18.0394 7.2741C17.9174 7.32651 17.7862 7.3541 17.6534 7.35525C17.5206 7.3564 17.3889 7.3311 17.266 7.28082C17.1431 7.23054 17.0315 7.15629 16.9376 7.0624C16.8437 6.9685 16.7695 6.85685 16.7192 6.73395C16.6689 6.61106 16.6436 6.47938 16.6447 6.3466C16.6459 6.21382 16.6735 6.0826 16.7259 5.9606C16.7783 5.83859 16.8545 5.72825 16.95 5.636L17.657 4.929C17.8445 4.74153 18.0988 4.63621 18.364 4.63621C18.6292 4.63621 18.8835 4.74153 19.071 4.929ZM12 2C12.2652 2 12.5196 2.10536 12.7071 2.29289C12.8946 2.48043 13 2.73478 13 3V4C13 4.26522 12.8946 4.51957 12.7071 4.70711C12.5196 4.89464 12.2652 5 12 5C11.7348 5 11.4804 4.89464 11.2929 4.70711C11.1053 4.51957 11 4.26522 11 4V3C11 2.73478 11.1053 2.48043 11.2929 2.29289C11.4804 2.10536 11.7348 2 12 2Z"
                    fill="rgb(203, 203, 203)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_219_11">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div
                className={
                  isDarkTheme
                    ? "toggler-circle-container dark-theme"
                    : "toggler-circle-container"
                }
                onClick={() => handleDarkTheme()}
              >
                <div
                  className={
                    isDarkTheme ? "toggler-circle dark-theme" : "toggler-circle"
                  }
                ></div>
              </div>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.958 15.3251C21.162 14.8391 20.579 14.4251 20.09 14.6411C19.1126 15.0701 18.0565 15.2908 16.989 15.2891C12.804 15.2891 9.412 11.9651 9.412 7.86406C9.41047 6.4794 9.80385 5.12303 10.546 3.95406C10.83 3.50606 10.489 2.88606 9.969 3.01806C5.96 4.04106 3 7.61306 3 11.8621C3 16.9091 7.175 21.0001 12.326 21.0001C16.226 21.0001 19.566 18.6551 20.958 15.3251Z"
                  fill="rgb(203, 203, 203)"
                />
                <path
                  d="M15.611 3.10304C15.081 2.74904 14.449 3.38104 14.802 3.91104L15.432 4.85604C15.6876 5.2392 15.824 5.68946 15.824 6.15004C15.824 6.61061 15.6876 7.06087 15.432 7.44404L14.802 8.38904C14.449 8.91904 15.082 9.55104 15.612 9.19704L16.556 8.56704C16.9392 8.31147 17.3894 8.17509 17.85 8.17509C18.3106 8.17509 18.7608 8.31147 19.144 8.56704L20.089 9.19704C20.619 9.55104 21.251 8.91904 20.897 8.38904L20.267 7.44404C20.0114 7.06087 19.8751 6.61061 19.8751 6.15004C19.8751 5.68946 20.0114 5.2392 20.267 4.85604L20.897 3.91104C21.251 3.38104 20.619 2.74904 20.088 3.10304L19.144 3.73304C18.7608 3.98861 18.3106 4.12499 17.85 4.12499C17.3894 4.12499 16.9392 3.98861 16.556 3.73304L15.611 3.10304Z"
                  fill="rgb(203, 203, 203)"
                />
              </svg>
            </div>
          </div>
          <div
            onClick={() => setDisplaySideBar(false)}
            className={
              isDarkTheme
                ? "hide-sidebar-container dark-theme"
                : "hide-sidebar-container"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M432 448C429.899 448.003 427.817 447.591 425.876 446.786C423.935 445.981 422.172 444.799 420.69 443.31L68.69 91.3099C65.8161 88.2849 64.2375 84.2569 64.291 80.0847C64.3444 75.9125 66.0255 71.9263 68.9759 68.9758C71.9264 66.0254 75.9126 64.3443 80.0848 64.2909C84.257 64.2374 88.285 65.816 91.31 68.6899L443.31 420.69C445.546 422.928 447.069 425.778 447.686 428.88C448.302 431.983 447.985 435.199 446.775 438.122C445.565 441.045 443.515 443.543 440.885 445.301C438.255 447.059 435.163 447.998 432 448ZM255.66 384C214.17 384 174.16 371.72 136.74 347.5C102.67 325.5 72 293.99 48.04 256.5V256.42C67.98 227.85 89.82 203.69 113.28 184.21C113.492 184.032 113.665 183.813 113.788 183.565C113.911 183.317 113.982 183.047 113.995 182.771C114.008 182.494 113.964 182.218 113.865 181.96C113.766 181.702 113.614 181.467 113.42 181.27L93.5 161.38C93.146 161.023 92.6706 160.812 92.1684 160.79C91.6663 160.768 91.1741 160.936 90.79 161.26C65.87 182.26 42.74 208.02 21.71 238.18C18.0918 243.373 16.0992 249.524 15.9852 255.853C15.8713 262.181 17.6412 268.4 21.07 273.72C47.48 315.05 81.47 349.86 119.35 374.37C162 402 207.9 416 255.66 416C281.44 415.92 307.037 411.672 331.46 403.42C331.782 403.311 332.071 403.121 332.3 402.869C332.528 402.617 332.688 402.31 332.766 401.979C332.843 401.648 332.834 401.302 332.74 400.975C332.646 400.648 332.471 400.35 332.23 400.11L310.65 378.53C310.153 378.045 309.539 377.698 308.867 377.523C308.196 377.348 307.49 377.35 306.82 377.53C290.107 381.834 272.918 384.007 255.66 384ZM490.84 238.6C464.38 197.68 430.05 162.92 391.57 138.07C349 110.55 302 95.9999 255.66 95.9999C230.154 96.0451 204.837 100.382 180.77 108.83C180.449 108.941 180.162 109.133 179.936 109.386C179.71 109.639 179.552 109.946 179.477 110.277C179.402 110.608 179.412 110.953 179.507 111.279C179.602 111.605 179.779 111.901 180.02 112.14L201.57 133.69C202.072 134.183 202.695 134.535 203.376 134.711C204.057 134.886 204.772 134.879 205.45 134.69C221.82 130.262 238.702 128.012 255.66 128C296.35 128 336.24 140.43 374.21 165C408.92 187.4 439.95 218.88 463.97 256C463.988 256.023 463.998 256.051 463.998 256.08C463.998 256.109 463.988 256.137 463.97 256.16C446.534 283.609 424.897 308.151 399.85 328.89C399.636 329.067 399.46 329.286 399.335 329.534C399.21 329.783 399.139 330.054 399.124 330.332C399.11 330.609 399.154 330.887 399.253 331.147C399.352 331.406 399.505 331.642 399.7 331.84L419.6 351.73C419.952 352.085 420.425 352.296 420.925 352.32C421.425 352.344 421.915 352.18 422.3 351.86C449.04 329.345 472.187 302.88 490.94 273.38C494.255 268.181 496.007 262.141 495.99 255.975C495.972 249.81 494.185 243.779 490.84 238.6Z"
                fill={isDarkTheme ? "#a0a1a3" : "black"}
              />
              <path
                d="M256 160C248.809 159.996 241.641 160.801 234.63 162.4C234.276 162.474 233.948 162.642 233.682 162.887C233.416 163.132 233.221 163.444 233.119 163.791C233.016 164.138 233.01 164.506 233.1 164.856C233.19 165.206 233.373 165.526 233.63 165.78L346.22 278.34C346.474 278.597 346.794 278.78 347.144 278.87C347.494 278.96 347.862 278.954 348.209 278.851C348.556 278.749 348.868 278.554 349.113 278.288C349.358 278.022 349.526 277.694 349.6 277.34C352.806 263.28 352.802 248.679 349.591 234.621C346.38 220.563 340.042 207.409 331.05 196.135C322.058 184.862 310.641 175.76 297.648 169.504C284.656 163.248 270.42 160 256 160ZM165.78 233.66C165.526 233.403 165.206 233.22 164.856 233.13C164.506 233.04 164.138 233.046 163.791 233.149C163.444 233.251 163.131 233.446 162.887 233.712C162.642 233.978 162.473 234.306 162.4 234.66C158.773 250.503 159.229 267.008 163.723 282.628C168.218 298.247 176.605 312.47 188.097 323.962C199.59 335.455 213.813 343.842 229.432 348.337C245.052 352.831 261.556 353.287 277.4 349.66C277.754 349.586 278.082 349.418 278.348 349.173C278.614 348.928 278.809 348.616 278.911 348.269C279.014 347.922 279.02 347.554 278.93 347.204C278.84 346.854 278.657 346.534 278.4 346.28L165.78 233.66Z"
                fill={isDarkTheme ? "#a0a1a3" : "black"}
              />
            </svg>
            Hide SideBar
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default SideBar;
