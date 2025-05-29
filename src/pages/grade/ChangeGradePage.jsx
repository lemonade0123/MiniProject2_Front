import { useEffect, useState } from "react";
import styles from "./ChangeGradePage.module.css";

export default function ChangeGradePage() {
  const [stores, setStores] = useState([]); // 가게 목록
  const [showForm, setShowForm] = useState(false); // 폼 표시 여부
  const [error, setError] = useState("");

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    address: "",
    hours: "",
    contact: "",
    description: "",
    registrationNumber: ""
  });

  const userLevel = stores.length > 0 ? "점주" : "일반";

  useEffect(() => {
    // 초기화 시 가게 없다고 가정
    setStores([]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { name, address, registrationNumber } = storeInfo;

    if (!name || !address || !registrationNumber) {
      setError("상호명, 주소, 사업자 등록 번호는 필수입니다! 😿");
      return;
    }

    // 가게 등록
    const newStore = { ...storeInfo, id: Date.now() };
    setStores((prev) => [...prev, newStore]);
    alert("가게 등록 완료! 🎉 이제 점주가 되었어요~");

    // 초기화
    setStoreInfo({
      name: "",
      address: "",
      hours: "",
      contact: "",
      description: "",
      registrationNumber: ""
    });
    setShowForm(false);
    setError("");
  };

  const handleDeleteStore = (storeId) => {
    const newStores = stores.filter((store) => store.id !== storeId);
    setStores(newStores);

    if (newStores.length === 0) {
      alert("모든 가게가 삭제되어 일반회원으로 변경됩니다! 😿");
    } else {
      alert("가게가 폐업되었어요~ 🏚️");
    }
  };

  return (
    <div className={styles.container}>
      <h2>회원 등급 변경 페이지입니다</h2>
      <h2>현재 <strong>{userLevel}</strong>입니다.</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "입력 취소하기" : "가게 추가하기"}
      </button>

      {showForm && (
          <div className={styles.formBox}>
          <h3>가게 정보 입력</h3>

          <input
            name="name"
            placeholder="상호명 *"
            value={storeInfo.name}
            onChange={handleChange}
            />
          <input
            name="address"
            placeholder="주소 *"
            value={storeInfo.address}
            onChange={handleChange}
            />
          <input
            name="hours"
            placeholder="영업시간"
            value={storeInfo.hours}
            onChange={handleChange}
            />
          <input
            name="contact"
            placeholder="연락처"
            value={storeInfo.contact}
            onChange={handleChange}
            />
          <input
            name="description"
            placeholder="가게 소개"
            value={storeInfo.description}
            onChange={handleChange}
            />
          <input
            name="registrationNumber"
            placeholder="사업자 등록 번호 *"
            value={storeInfo.registrationNumber}
            onChange={handleChange}
            />

          {error && <p className={styles.errorText}>{error}</p>}

          <button onClick={handleSubmit}>등록하기</button>
        </div>
      )}
  
        {userLevel === "점주" && (
          <div className={styles.storeList}>
            <h3>보유 중인 가게 목록 🏪</h3>
            <ul>
              {stores.map((store) => (
                <li key={store.id}>
                  <strong>{store.name}</strong> ({store.address}){" "}
                  <button onClick={() => handleDeleteStore(store.id)}>폐업하기</button>
                </li>
              ))}
            </ul>
           </div>
        )}
    </div>
  );
}
