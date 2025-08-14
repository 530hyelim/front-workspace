//import './css/index.css';
import commonStyle from './3.Common.module.css'
import userListStyle from './3.UserList.module.css'
import boardListStyle from './3.BoardList.module.css'

const users = [
    { id: 1, name: '홍길동', age: 28 },
    { id: 2, name: '김영희', age: 34 },
    { id: 3, name: '박철수', age: 23 },
];

const posts = [
    { id: 1, title: '공지사항입니다.', writer: '관리자' },
    { id: 2, title: '새로운 기능 소개', writer: '홍길동' },
    { id: 3, title: '업데이트 예정 안내', writer: '김영희' },
];

function UserList() {
    return (
        <div>
            <h2 className={userListStyle['title-user']}>👤 사용자 목록</h2>
            <ul className={commonStyle.list}>
                {users.map(user => (
                    <li key={user.id} className={`${commonStyle['list-item']} ${commonStyle.hoverable}`}>
                        이름: {user.name} / 나이: <span className={userListStyle.age}>{user.age}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function BoardList() {
    return (
        <div>
            <h2 className={boardListStyle['title-board']}>📋 게시판 목록</h2>
            <ul className={commonStyle.list}>
                {posts.map(post => (
                    <li key={post.id} className={`${commonStyle['list-item']} ${commonStyle.hoverable}`}>
                        제목: <span className={commonStyle.highlight}>{post.title}</span> / 작성자:{" "}
                        <span className={boardListStyle.writer}>{post.writer}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function ModuleCssPractice() {
    return (
        <div>
            <UserList />
            <BoardList />
        </div>
    );
}
