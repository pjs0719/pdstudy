const sortMemos = (memos, sortType) => {
    if (sortType === "recent") {
        return [...memos].sort((a, b) => b.timestamp - a.timestamp) // 최신 메모부터 정렬
    } else if (sortType === "alphabetical") {
        return [...memos].sort((a, b) => a.title.localeCompare(b.title)) // 제목순으로 정렬
    } else if (sortType === "old") {
        return [...memos].sort((a, b) => a.timestamp - b.timestamp) // 오래된 메모부터 정렬
    }
    return memos // 정렬 기준이 없을 경우 원래 순서대로 반환
}
export default sortMemos