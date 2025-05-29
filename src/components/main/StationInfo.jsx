// src/components/main/StationInfo.jsx
import React from 'react'; // React.Fragment 사용을 위해 임포트
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
// CSS 모듈 임포트는 더 이상 필요 없습니다.
// import styles from "./StationInfo.module.css";

// 음식점 데이터는 그대로 유지합니다.
const restaurantData = {
  seoul: ["백종원김밥", "역전우동", "서울돈까스"],
  cityhall: ["광화문족발", "시청국밥", "도시락천국"],
  jonggak: ["종로피자", "짜장면천국", "포케하와이"],
  jongno3: ["곱창이야기", "떡볶이포차", "김치찜전문점"],
  // 다른 역들에 대한 데이터도 필요하다면 여기에 추가...
};

export default function StationInfo({ station }) {
  // station prop이 없을 경우를 대비하여 옵셔널 체이닝 및 기본값 처리
  const restaurants = station ? (restaurantData[station.code] || []) : [];

  // station 정보가 없으면 아무것도 렌더링하지 않거나 로딩/안내 메시지 표시 가능
  if (!station) {
    return null; // 또는 <Typography>정보를 표시할 역을 선택해주세요.</Typography> 등
  }

  return (
    // Paper 컴포넌트를 사용하여 정보 박스를 감쌉니다.
    // Paper는 약간의 입체감(그림자)과 구분되는 배경을 제공합니다.
    <Paper
      elevation={2} // 그림자 깊이 (0~24)
      sx={{
        p: { xs: 2, sm: 3 }, // 반응형 패딩 (기존 App.jsx에서의 패딩과 유사하게)
        width: '100%',       // 부모 컨테이너의 전체 너비 사용
        borderRadius: 2,     // 테마의 기본 borderRadius 값의 2배 (예: 4px * 2 = 8px)
        bgcolor: 'background.paper', // 테마의 paper 배경색 (다크/라이트 모드 자동 대응)
        // mt: 3, // 상단 마진은 이 컴포넌트를 사용하는 부모에서 지정하는 것이 좋습니다.
      }}
    >
      <Typography
        variant="h6" // 제목 크기 (h2는 너무 클 수 있어 h6로 조정)
        component="h2" // HTML 시맨틱 태그는 h2로 유지
        gutterBottom // 아래쪽 마진 추가
        sx={{ color: 'text.primary' }} // 테마의 주요 텍스트 색상 사용
      >
        {station.name}역 근처 음식점
      </Typography>

      {restaurants.length > 0 ? (
        <List disablePadding> {/* ul 태그의 기본 패딩 제거 */}
          {restaurants.map((name, idx) => (
            // React.Fragment를 사용하여 key를 전달하고, 각 아이템 사이에 Divider를 넣습니다.
            <React.Fragment key={idx}>
              <ListItem sx={{ py: 0.5 }}> {/* 리스트 아이템의 수직 패딩을 약간 줄임 */}
                <ListItemText
                  primary={name}
                  sx={{ color: 'text.secondary' }} // 부가적인 텍스트 색상 사용
                />
              </ListItem>
              {/* 마지막 아이템이 아닐 경우에만 구분선 추가 */}
              {idx < restaurants.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          주변 음식점 정보가 없습니다. 😥
        </Typography>
      )}
    </Paper>
  );
}