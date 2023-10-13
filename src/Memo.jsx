import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { CSSTransition } from "react-transition-group"
import "./Memo.moudule.css"

// Memo 컴포넌트 정의
function Memo({ onSave, onClose, show }) {
  // 메모의 제목과 내용을 state로 관리
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  // 저장 버튼 클릭 시 호출되는 함수
  const handleSave = () => {
    // 제목과 내용이 빈 문자열이 아닌 경우에만 메모를 저장하고 모달을 닫음
    if (title.trim() && content.trim()) {
      const newMemo = { title, content }
      onSave(newMemo) // 부모 컴포넌트에서 전달된 onSave 함수를 호출하여 새로운 메모를 저장
      setTitle("") // 제목 초기화
      setContent("") // 내용 초기화
      onClose() // 모달 닫기
    }
  }
  return (
    // CSSTransition 컴포넌트를 사용하여 모달의 입장과 퇴장 애니메이션을 적용
    <CSSTransition in={show} timeout={300} classNames="memo-modal" unmountOnExit>
      {/* 모달 컴포넌트 */}
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>메모 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 입력 폼 */}
          <Form>
            {/* 메모 제목 입력 필드 */}
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="약 이름을 입력해주세요"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            {/* 메모 내용 입력 필드 */}
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="설명을 작성해주세요"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* 모달 하단 영역 */}
        <Modal.Footer>
          {/* 뒤로 가기 버튼 */}
          <Button variant="secondary" onClick={onClose}>
            뒤로 가기
          </Button>
          {/* 저장 버튼 */}
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </CSSTransition>
  )
}

export default Memo
