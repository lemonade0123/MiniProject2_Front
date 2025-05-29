// src/components/main/StationInfo.jsx
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
// import styles from "./StationInfo.module.css"; // 이 줄은 더 이상 필요 없습니다.

// 음식점 데이터는 이 컴포넌트 내부에 정의 (사용자가 제공한 "정상" 버전 기반)
const restaurantData = {
  seoul: ["백종원김밥", "역전우동", "서울돈까스"],
  cityhall: ["광화문족발", "시청국밥", "도시락천국"],
  jonggak: ["종로피자", "짜장면천국", "포케하와이"],
  jongno3: ["곱창이야기", "떡볶이포차", "김치찜전문점"],
  // 다른 역들에 대한 데이터를 여기에 추가할 수 있습니다.
};

export default function StationInfo({ station }) {
  // station prop이 유효하고 station.code가 있을 때만 restaurants를 찾습니다.
  // station.code를 소문자로 변환하여 restaurantData의 키와 일치시킬 수 있도록 합니다 (선택 사항).
  const restaurants =
    station && station.code
      ? restaurantData[station.code.toLowerCase()] || []
      : [];

  // station 정보가 없으면 사용자에게 안내 메시지를 보여주는 Paper를 반환합니다.
  if (!station) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          width: '100%',
          borderRadius: 2,
          bgcolor: 'background.paper',
          textAlign: 'center', // 텍스트 중앙 정렬
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          역 정보를 보려면 지도에서 역을 선택해주세요. 🗺️
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={2} // Paper에 약간의 그림자 효과
      sx={{
        p: { xs: 2, sm: 3 }, // 반응형 내부 패딩
        width: '100%',       // 부모 컨테이너의 전체 너비 사용
        borderRadius: 2,     // 테마 기반 모서리 둥글기
        bgcolor: 'background.paper', // 테마의 paper 배경색 (다크/라이트 모드 자동 대응)
      }}
    >
      <Typography
        variant="h6" // 제목 크기
        component="h2" // 시맨틱 HTML 태그
        gutterBottom   // 제목 아래에 마진 추가
        sx={{ color: 'text.primary', fontWeight: 'medium' }} // 테마의 주요 텍스트 색상 및 굵기
      >
        {station.name}역 근처 음식점
      </Typography>

      {restaurants.length > 0 ? (
        <List disablePadding> {/* ul 태그의 기본 패딩 제거 */}
          {restaurants.map((name, idx) => (
            // 음식점 이름이 중복될 수 있으므로, 현재는 index를 key로 사용합니다.
            // 각 음식점 데이터에 고유 ID가 있다면 그것을 사용하는 것이 더 좋습니다.
            <React.Fragment key={idx}>
              <ListItem sx={{ py: 0.5, px: 0 }}> {/* 리스트 아이템의 수직 패딩 및 좌우 패딩 제거 (선택 사항) */}
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
          {station.name}역 근처에 등록된 음식점 정보가 없습니다. 😥
        </Typography>
      )}
    </Paper>
  );
}