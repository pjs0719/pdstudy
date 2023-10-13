import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// DropdownComponent 컴포넌트 정의
const DropdownComponent = ({ selectedOption, onOptionChange }) => {
  
  // 드롭다운 메뉴에서 항목을 선택할 때 호출되는 함수
  const handleSelect = (eventKey) => {
    onOptionChange(eventKey); // 선택된 항목의 eventKey를 부모 컴포넌트로 전달하여 정렬 기준을 변경
  };

  return (
    // 드롭다운 컴포넌트
    <Dropdown onSelect={handleSelect}>

      {/* 드롭다운 토글 버튼 */}
      <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">

        {/* 선택된 정렬 기준에 따라 토글 버튼의 텍스트를 동적으로 표시 */}
        {selectedOption === 'recent' ? '최근생성순' : selectedOption === 'alphabetical' ? '가나다순' : '오래된순'}
      </Dropdown.Toggle>
      
      {/* 드롭다운 메뉴 항목들 */}
      <Dropdown.Menu>
        <Dropdown.Item eventKey="recent">최근생성순</Dropdown.Item>
        <Dropdown.Item eventKey="alphabetical">가나다순</Dropdown.Item>
        <Dropdown.Item eventKey="old">오래된순</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;