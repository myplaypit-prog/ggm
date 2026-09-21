-- ─────────────────────────────────────────────────────────────
-- 예시(데모) 상품 데이터
--
-- 화면이 텅 비어 보이지 않도록 넣어 둔 연습용 데이터입니다.
-- 스키마를 바꾸는 마이그레이션이 아니라 "데이터만 넣는 파일"이라
-- migrations 가 아닌 seed 폴더에 둡니다. 필요할 때만 직접 실행하세요.
--
-- ⚠️ 주의할 점
-- 1) seller_id 는 테스트 계정(테스트냥)의 id 입니다.
--    다른 DB 에서 쓰려면 이 값을 그 DB 의 mm_profiles.id 로 바꿔야 해요.
-- 2) 사진은 mm-products 버킷의 demo-*.png 파일을 가리킵니다.
--    파일이 없으면 카드에 고양이 그림(사진 없음)이 대신 나옵니다.
--    사진 자체는 브라우저 canvas 로 만든 일러스트 카드예요.
--    (연한 그라데이션 배경 + 큰 이모지)
-- 3) 지우려면: delete from public.mm_products where title in (...);
-- ─────────────────────────────────────────────────────────────

with seller as (select '1954e1df-e729-49b2-a472-9bc092c4a778'::uuid as id),
     img as (select '1954e1df-e729-49b2-a472-9bc092c4a778/' as dir)
insert into public.mm_products
  (seller_id, title, description, price, category, condition, status, region, images, created_at, updated_at)
select s.id, v.title, v.description, v.price, v.category, v.condition, v.status, v.region,
       array[(select dir from img) || v.img], now() - v.ago, now() - v.ago
from seller s,
(values
  ('거의 새 운동화 275 (두 번 신었어요)',
   E'작년에 선물받았는데 사이즈가 커서 두 번만 신었어요.\n박스도 그대로 있습니다. 직거래만 가능해요!',
   45000, 'fashion', 'like_new', 'selling', '연남동', 'demo-sneakers.png', interval '22 minutes'),

  ('접이식 미니벨로 자전거',
   E'출퇴근용으로 잘 탔습니다. 접으면 트렁크에 들어가요.\n타이어는 작년에 새로 갈았고, 브레이크 상태 좋습니다.',
   120000, 'hobby', 'used', 'selling', '망원동', 'demo-bike.png', interval '2 hours'),

  ('몬스테라 대형 화분 (잎 12장)',
   E'3년 키운 몬스테라예요. 이사 가는데 너무 커서 못 가져가요 ㅠㅠ\n화분째 드립니다. 차 있으신 분만 부탁드려요.',
   25000, 'plant', 'used', 'selling', '성수동', 'demo-plant.png', interval '5 hours'),

  ('따뜻한 무드등 스탠드',
   E'침대 옆에 두고 쓰던 무드등입니다. 3단계 밝기 조절 돼요.\n전구 새것으로 갈아 드립니다.',
   18000, 'interior', 'like_new', 'selling', '상수동', 'demo-lamp.png', interval '9 hours'),

  ('수동 커피 그라인더',
   E'원두 갈 때 쓰던 핸드밀입니다. 분쇄도 조절 가능해요.\n캠핑 갈 때 쓰기 좋아요. 세척해서 드립니다.',
   30000, 'etc', 'used', 'reserved', '공덕동', 'demo-coffee.png', interval '1 day'),

  ('추리소설 10권 한꺼번에 나눔',
   E'다 읽은 추리소설들이에요. 상태는 보통입니다.\n한 권씩은 안 되고 10권 통째로 가져가실 분만요. 무료 나눔!',
   0, 'book', 'used', 'selling', '서교동', 'demo-books.png', interval '1 day 4 hours'),

  ('필름카메라 (작동 확인 완료)',
   E'필름 넣고 테스트했고 잘 찍힙니다.\n가죽 케이스 같이 드려요. 필름은 포함 안 돼요.',
   85000, 'digital', 'used', 'selling', '해방촌', 'demo-camera.png', interval '2 days'),

  ('원목 스툴 2개 (세트)',
   E'주방에서 쓰던 원목 스툴 두 개입니다.\n앉는 면에 생활기스 조금 있지만 튼튼해요.',
   40000, 'interior', 'used', 'selling', '역삼동', 'demo-chair.png', interval '2 days 8 hours'),

  ('레고 클래식 대용량 박스',
   E'아이가 커서 이제 안 갖고 놀아요. 부품 다 세척했습니다.\n설명서는 없고 브릭만 가득 들어 있어요.',
   55000, 'kids', 'like_new', 'selling', '연남동', 'demo-lego.png', interval '3 days'),

  ('기계식 키보드 적축 (키캡 포함)',
   E'타건감 좋은 적축 키보드예요. 윤활은 안 했습니다.\n여분 키캡 세트도 같이 드려요.',
   65000, 'digital', 'like_new', 'sold', '성수동', 'demo-keyboard.png', interval '4 days'),

  ('큰 곰인형 나눔합니다 (세탁 완료)',
   E'키가 제 허리까지 오는 큰 곰인형이에요.\n세탁해서 깨끗합니다. 필요하신 분 가져가세요~',
   0, 'kids', 'used', 'selling', '망원동', 'demo-teddy.png', interval '5 days')
) as v(title, description, price, category, condition, status, region, img, ago);
