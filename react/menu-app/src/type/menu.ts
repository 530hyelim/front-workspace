// 메뉴 타입 정의
export interface Menu {
    id: number,
    restaurant: string,
    name: string,
    price: number,
    type: 'kr'|'ch'|'jp'|'all',
    taste: 'hot'|'mild'|'all'
}

// 메뉴 등록 타입
export type MenuCreate = Omit<Menu, 'id'>;