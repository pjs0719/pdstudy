import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './App.css';
import { ListGroup, Card } from 'react-bootstrap'; 
import Memo from './Memo';
import DropdownComponent from './Dropdown';

// 메모 정렬 함수
const sortMemos = (memos, sortType) => {
  if (sortType === 'recent') {
    return [...memos].sort((a, b) => b.timestamp - a.timestamp); // 최신 메모부터 정렬
  } else if (sortType === 'alphabetical') {
    return [...memos].sort((a, b) => a.title.localeCompare(b.title)); // 제목순으로 정렬
  } else if (sortType === 'old') {
    return [...memos].sort((a, b) => a.timestamp - b.timestamp); // 오래된 메모부터 정렬
  }
  return memos; // 정렬 기준이 없을 경우 원래 순서대로 반환
};

function App() {
  const [memos, setMemos] = useState([]); // 메모 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 변수
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태 변수
  const [sortType, setSortType] = useState('recent'); // 메모 정렬 기준

  // 메모를 추가하는 함수
  const addMemo = (newMemo) => {
    if (newMemo.content.trim() !== '') {
    const memoWithTimestamp = { ...newMemo, timestamp: Date.now() }; // 현재 시간을 타임스탬프로 추가
    setMemos(prevMemos => [...prevMemos, memoWithTimestamp]); // 새로운 메모를 목록에 추가
    setModalIsOpen(false); // 모달 닫기
    }
  };

  // 정렬 기준을 선택할 때 호출되는 함수
  const handleSortSelect = (selectedSortType) => {
    const sortedMemos = sortMemos(memos, selectedSortType); // 선택된 정렬 기준으로 메모를 정렬
    setMemos(sortedMemos); // 정렬된 메모로 state 업데이트
   setSortType(selectedSortType); // 선택된 정렬 기준으로 state 업데이트
  };

  //searchTerm과 메모의 제목을 비교하여, 검색어가 메모 제목에 포함되어 있는 메모만 필터링하여 filteredMemos라는 변수에 저장
  const filteredMemos = memos.filter((memo) =>
    memo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMemos = [...filteredMemos];

  return (
    <div className="App">
      {/* ... */}
      {/* 검색창과 정렬 드롭다운 */}
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownComponent selectedOption={sortType} onOptionChange={handleSortSelect} memos={memos} />
      </InputGroup>
  
      {/* 메모 목록 */}
      <ListGroup>
        {sortedMemos.map((memo, index) => (
          <Card key={index} className="memo-card">
            <Card.Body>
              <h3>{memo.title}</h3>
              <p>{memo.content}</p>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
  
      {/* 메모 추가 버튼 */}
      <Button variant="primary" className="record-button" onClick={() => setModalIsOpen(true)}>
        기록하기
      </Button>
  
      {/* 메모 모달 */}
      <CSSTransition in={modalIsOpen} timeout={300} classNames="memo-modal" unmountOnExit>
        <div className="memo-modal-container">
          <Memo onSave={addMemo} onClose={() => setModalIsOpen(false)} show={modalIsOpen} />
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;



