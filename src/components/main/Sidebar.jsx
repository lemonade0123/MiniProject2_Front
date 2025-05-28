// src/components/main/SideBar.jsx (또는 Sidebar.jsx)
// Gist에 올려주신 코드를 기반으로 합니다.

import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css"; // CSS Modules 경로 확인
import logo from "../../assets/Logo.png"; // 로고 경로 확인 (이전엔 Logo.jpg 였습니다)
import RegisterModal from "./Register"; // Register.jsx (또는 RegisterModal.jsx) 경로 확인
import { kakaoLogin } from "../../utils/KakaoLogin"; // KakaoLogin 유틸 경로 확인
// import { Link } from "react-router-dom"; // 사용하지 않으므로 주석 처리 또는 삭제

// App.jsx에서 정의한 PAGE_KEYS를 여기서도 사용하려면 import 해야 합니다.
// 또는 문자열을 직접 사용합니다. 여기서는 문자열을 직접 사용하는 것으로 가정합니다.
// import { PAGE_KEYS } from '../../constants/pageKeys'; // 예시 경로

export default function SideBar({ onNavigate }) { // onNavigate, currentView props를 받습니다.
  const [collapsed, setCollapsed] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBoardSubMenu, setShowBoardSubMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    kakaoLogin()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        alert("로그인에 실패했습니다.");
      });
  };

  const handleLogout = () => {
    const kakao = window.Kakao;
    if (kakao && kakao.Auth && kakao.Auth.getAccessToken()) {
      kakao.Auth.logout(() => {
        console.log("카카오 SDK 로그아웃 완료");
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        if (typeof onNavigate === 'function') {
          onNavigate("metro"); // 로그아웃 시 메인(지하철) 화면으로
        }
      });
    } else {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      if (typeof onNavigate === 'function') {
        onNavigate("metro"); // 로그아웃 시 메인(지하철) 화면으로
      }
    }
  };

  const toggleBoardSubMenu = () => {
    setShowBoardSubMenu(prevShow => !prevShow);
  };

  // 페이지 이동 처리 함수
  const handleNavigation = (pageKey) => {
    console.log(`SideBar: Navigating to '${pageKey}'`); // ❗️ 로그 추가
    if (typeof onNavigate === 'function') {
      onNavigate(pageKey); // App.jsx의 navigateToPage 호출
      setShowBoardSubMenu(false); // 다른 페이지로 이동 시 게시판 하위 메뉴는 닫음
      // setCollapsed(true); // 필요시 사이드바도 닫기 (선택 사항)
    } else {
      console.error("SideBar: onNavigate prop is not a function or not provided!", onNavigate);
    }
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.toggleContainer}>
          <button onClick={() => setCollapsed(!collapsed)} className={styles.toggleButton}>
            {collapsed ? "▶" : "☰"}
          </button>
        </div>

        {!collapsed && (
          <div className={styles.menuContent}>
            <div className={styles.logoContainer}>
              <button onClick={() => handleNavigation('metro')} className={styles.logoLinkButton}>
                <img src={logo} alt="로고" className={styles.logo} />
              </button>
            </div>

            <nav className={styles.navItems}>
              {!isLoggedIn ? (
                <>
                  <button className={`${styles.navButton} ${styles.authButton}`} onClick={handleLogin}>
                    로그인
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.authButton}`}
                    onClick={() => setShowRegister(true)}
                  >
                    회원가입
                  </button>
                </>
              ) : (
                <>
                  <button className={`${styles.navButton} ${styles.authButton}`} onClick={handleLogout}>
                    로그아웃
                  </button>
                  {/* ❗️ MyPage 버튼: handleNavigation 사용 확인 */}
                  <button onClick={() => handleNavigation('mypage')} className={styles.navButton}>
                    마이페이지
                  </button>
                </>
              )}

              <hr className={styles.divider} />

              <div className={styles.boardMenuItemContainer}>
                <button
                  className={`${styles.navButton} ${styles.boardToggleButton}`}
                  onClick={toggleBoardSubMenu}
                  aria-expanded={showBoardSubMenu}
                  aria-controls="board-submenu"
                >
                  게시판
                  <span className={`${styles.arrow} ${showBoardSubMenu ? styles.arrowUp : styles.arrowDown}`}></span>
                </button>
                {showBoardSubMenu && (
                  <div id="board-submenu" className={styles.boardSubMenu}>
                    <button onClick={() => handleNavigation('poll')} className={styles.subMenuItem}>
                      투표게시판
                    </button>
                    <button onClick={() => handleNavigation('freeboard')} className={styles.subMenuItem}>
                      자유게시판
                    </button>
                    <button onClick={() => handleNavigation('mealmateboard')} className={styles.subMenuItem}>
                      밥친구 구하기
                    </button>
                    <button onClick={() => handleNavigation('review')} className={styles.subMenuItem}>
                      리뷰 게시판
                    </button>
                  </div>
                )}
              </div>
              
              {/* "내 가게 관리" 버튼은 이전 요청에 따라 삭제된 상태 유지 */}
            </nav>
          </div>
        )}
      </aside>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}