import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSpotifyToken from "../../hooks/useSpotifyToken";

const Header = () => {
  const [isAuthenticate, setAuthenticate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // 드롭박스를 감지하기 위한 ref
  const { login, clearToken, token } = useSpotifyToken();

  useEffect(() => {
    // 드롭다운 외부 클릭을 감지하는 이벤트 핸들러
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="ml-6 mr-2 my-2 flex justify-between">
      <Link to="/" className="self-center">
        <img
          src="../src/assets/2024 Spotify Brand Assets/Spotify_Primary_Logo_RGB_White.png"
          alt="spotify"
          className="w-8 h-8 self-center ml-1"
        />
      </Link>

      <div className="flex gap-2">
        <Link to="/">
          <span className="home bg-[#1f1f1f] rounded-full w-12 h-12 flex justify-center">
            <svg
              className="self-center w-6 h-6"
              fill="#b3b3b3"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <path
                fillRule="evenodd"
                d="M192,1.42108547e-14 L384,153.6 L384,384 L213.333333,384 L213.333333,277.333333 L170.666667,277.333333 L170.666667,384 L0,384 L0,153.6 L192,0 Z M192,53.3333333 L42.6666667,170.666667 L42.6666667,341.333333 L128,341.333333 L128,234.666667 L256,234.666667 L256,341.333333 L341.333333,341.333333 L341.333333,170.666667 L192,53.3333333 Z"
                transform="translate(64 64)"
              ></path>
            </svg>
          </span>
        </Link>
        <Link to="/search">
          <div
            className={`search-box flex gap-4 items-center bg-[#1f1f1f] text-white rounded-full px-4 py-2 h-12 w-[474px] cursor-pointer hover:bg-[#404040] ${
              isFocused ? "border-2 border-white" : ""
            }`}
          >
            <svg
              className="self-center w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#b3b3b3"
            >
              <path
                d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#b3b3b3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              type="text"
              placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
              className="search bg-transparent border-none w-4/5 outline-none text-sm text-white placeholder:text-[#b3b3b3] focus:outline-none focus:ring-0"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <svg
              className={`self-center w-8 h-8 hover:stroke-white pl-2 border-l-[1px] border-solid border-[#b3b3b3] ${
                isFocused ? "fill-white stroke-none" : ""
              }`}
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              stroke="#b3b3b3"
              fill="none"
              strokeWidth="2"
            >
              <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"></path>
            </svg>
          </div>
        </Link>
      </div>

      <div className="flex text-white self-center">
        {token ? (
          <div className="flex flex-col text-white relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 rounded-full cursor-pointer bg-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 z-10 bg-[#282828] divide-y divide-[#464646] rounded-lg shadow w-44">
                <ul className="py-2 text-sm bg-[#282828] text-[#eaeaea] rounded-[4px]">
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-[#464646]">
                      계정
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block px-4 py-2 hover:bg-[#464646] "
                    >
                      프로필
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-[#464646]">
                      설정
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <div
                    className="block px-4 py-2 text-sm bg-[#282828] hover:bg-[#464646] cursor-pointer"
                    onClick={clearToken}
                  >
                    로그아웃
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <a href="https://www.spotify.com/kr-ko/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-base font-semibold text-[#969696] focus:outline-none bg-transparent rounded-full 
                            hover:scale-105 hover:text-white"
              >
                가입하기
              </button>
            </a>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-base font-semibold text-gray-900 focus:outline-none bg-white rounded-full 
                            hover:scale-105 hover:bg-slate-50"
              onClick={login}
            >
              로그인하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
