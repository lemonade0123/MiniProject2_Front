// src/App.jsx
import { useState, useMemo, createContext, useContext } from "react";
import { Box, IconButton, ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4'; // 달 아이콘
import Brightness7Icon from '@mui/icons-material/Brightness7'; // 해 아이콘

import getAppTheme from "./theme/muiTheme.js"; // 테마 생성 함수 임포트

// 기존 사용자 정의 컴포넌트 임포트
import Sidebar from "./components/main/Sidebar";
import Header from "./components/main/Header";
import MetroMap from "./components/main/MetroMap";
import StationInfo from "./components/main/StationInfo";
import MyPage from "./pages/mypage/MyPage";
import PollDetailPage from "./pages/poll/PollDetailPage";
import FreeBoardPage from "./pages/board/FreeBoardPage";
import MealMateBoardPage from "./pages/board/MealMateBoardPage";
import ReviewBoardPage from "./pages/review/ReviewPage";
import StoreManagementPage from "./pages/storemanagement/StoreManagementPage";

// 테마 모드 변경을 위한 Context 생성
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// 실제 애플리케이션 UI를 렌더링하는 컴포넌트
function AppContent() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [view, setView] = useState("map");

  const theme = useTheme(); // 현재 적용된 테마 객체 가져오기
  const colorMode = useContext(ColorModeContext); // 테마 모드 변경 함수 가져오기

  return (
    <Box // 최상위 레이아웃 Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: 'background.default', // 테마의 기본 배경색 적용
      }}
    >
      <Sidebar setView={setView} /> {/* Sidebar 컴포넌트 */}

      <Box // 메인 콘텐츠 영역 (Header + Main content)
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Box // Header와 테마 토글 버튼을 포함하는 영역
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1.5,
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
            minHeight: '64px',
          }}
        >
          <Box sx={{ flexGrow: 1 }}> {/* Header 컴포넌트가 남은 공간 차지 */}
            <Header onSearchSelect={setSelectedStation} />
          </Box>

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
            aria-label={theme.palette.mode === 'dark' ? "라이트 모드로 변경" : "다크 모드로 변경"}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Box // 실제 콘텐츠가 표시되는 메인 영역
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // 메인 컨텐츠 내부 아이템들 중앙 정렬 (가로)
            p: { xs: 1.5, sm: 2, md: 3 }, // 메인 영역 전체 패딩
          }}
        >
          {/* 조건부 뷰 렌더링 */}
          {view === "mypage" ? (
            <MyPage setView={setView} />
          ) : view === "vote" ? (
            <PollDetailPage />
          ) : view === "free" ? (
            <FreeBoardPage />
          ) : view === "mate" ? (
            <MealMateBoardPage />
          ) : view === "review" ? (
            <ReviewBoardPage />
          ) : view === "manageStore" ? (
            <StoreManagementPage />
          ) : (
            // 기본 뷰 (MetroMap 및 StationInfo)
            <>
              <MetroMap selected={selectedStation} onSelect={setSelectedStation} />
              {selectedStation && (
                <Box
                  sx={{
                    mt: 3, // MetroMap과의 상단 간격
                    width: "100%", // 부모(main Box의 flex item) 너비에 맞춤
                    maxWidth: "900px", // StationInfo 컴포넌트의 최대 너비 제한
                    // StationInfo 컴포넌트 자체가 Paper로 되어 있어 배경색, 패딩, 그림자 등을 가집니다.
                    // 따라서 여기서는 중복되는 스타일을 제거하고 주로 레이아웃(위치, 크기)만 제어합니다.
                  }}
                >
                  <StationInfo station={selectedStation} />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// 테마 모드 상태를 관리하고 ThemeProvider를 제공하는 최상위 App 컴포넌트
export default function App() {
  const [mode, setMode] = useState('dark'); // 기본 'dark' 모드

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI 기본 스타일 리셋 및 테마 기반 스타일 적용 */}
        <AppContent /> {/* 실제 앱 콘텐츠 */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}