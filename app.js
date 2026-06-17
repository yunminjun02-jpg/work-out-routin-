// ==========================================
// FitFlow - JavaScript 비즈니스 로직 및 인터랙션
// ==========================================

// 1. 추천 운동 데이터 정의
const EXERCISE_DATA = {
    '가슴': ['벤치프레스', '인클라인 벤치프레스', '덤벨프레스', '케이블플라이', '딥스'],
    '등': ['턱걸이', '랫풀다운', '바벨로우', '시티드로우', '원암덤벨로우'],
    '어깨': ['오버헤드프레스', '사이드레터럴레이즈', '덤벨숄더프레스', '페이스풀', '리어델트플라이'],
    '하체': ['스쿼트', '레그프레스', '런지', '레그컬', '레그익스텐션'],
    '팔': ['바벨컬', '해머컬', '케이블컬', '트라이셉스푸시다운', '오버헤드익스텐션']
};

// 1-2. 운동 상세 설명 데이터 정의
const EXERCISE_DETAILS = {
    // 가슴
    '벤치프레스': '평평한 벤치에 누워 어깨너비보다 약간 넓게 바벨을 잡습니다. 가슴 중앙까지 천천히 내린 뒤 밀어 올립니다. 허리는 자연스럽게 아치를 만들고 견갑골은 모아 고정합니다. 가슴 전체와 삼두근 발달에 효과적입니다.',
    '인클라인 벤치프레스': '벤치를 30~45도로 세팅한 뒤 실시합니다. 바벨 또는 덤벨을 윗가슴 방향으로 내렸다가 밀어 올립니다. 어깨가 과도하게 들리지 않도록 주의합니다. 윗가슴 발달에 특히 효과적입니다.',
    '덤벨프레스': '양손에 덤벨을 들고 벤치에 누워 시작합니다. 가슴 양옆까지 덤벨을 내렸다가 위로 밀어 올립니다. 좌우 균형을 맞추기 좋고 가동범위가 넓습니다. 가슴 전체 발달에 도움이 됩니다.',
    '케이블플라이': '양쪽 케이블을 잡고 한 발 앞으로 나와 자세를 잡습니다. 팔꿈치를 약간 굽힌 상태로 양손을 모아줍니다. 가슴 수축을 느끼며 천천히 원위치합니다. 가슴 안쪽 자극을 주기에 좋습니다.',
    '딥스': '평행봉을 잡고 몸을 지탱한 상태에서 시작합니다. 상체를 약간 숙인 채 내려갔다가 올라옵니다. 팔꿈치는 자연스럽게 뒤로 향하도록 합니다. 가슴 하부와 삼두근 발달에 효과적입니다.',

    // 등
    '턱걸이': '어깨너비 정도로 바를 잡고 매달립니다. 가슴을 펴고 턱이 바 위로 올라갈 때까지 당깁니다. 반동을 최소화하며 천천히 내려옵니다. 광배근 발달에 매우 효과적입니다.',
    '랫풀다운': '패드를 고정하고 바를 넓게 잡습니다. 가슴 쪽으로 바를 당긴 뒤 천천히 올립니다. 상체를 과하게 젖히지 않습니다. 턱걸이와 비슷한 등 자극을 얻을 수 있습니다.',
    '바벨로우': '허리를 숙여 상체를 약 45도 유지합니다. 바벨을 배꼽 방향으로 당겼다가 내립니다. 허리가 말리지 않도록 복부에 힘을 줍니다. 등 두께 발달에 효과적입니다.',
    '시티드로우': '케이블 머신에 앉아 손잡이를 잡습니다. 가슴을 편 상태로 배 쪽으로 당깁니다. 견갑골을 모아 등 수축을 느낍니다. 등 중앙부 발달에 좋습니다.',
    '원암덤벨로우': '벤치에 한 손과 한 무릎을 지지합니다. 반대 손으로 덤벨을 들어 올립니다. 팔보다 팔꿈치를 뒤로 보낸다는 느낌으로 당깁니다. 좌우 균형을 잡는 데 도움이 됩니다.',

    // 어깨
    '오버헤드프레스': '바벨을 어깨 높이에 위치시키고 시작합니다. 머리 위로 밀어 올린 뒤 천천히 내립니다. 허리가 과하게 꺾이지 않도록 복부에 힘을 줍니다. 어깨 전면과 측면 발달에 효과적입니다.',
    '사이드레터럴레이즈': '덤벨을 양손에 들고 옆으로 들어 올립니다. 어깨 높이까지만 올리고 천천히 내립니다. 승모근 개입을 최소화하는 것이 중요합니다. 어깨 측면을 넓게 만드는 대표 운동입니다.',
    '덤벨숄더프레스': '덤벨을 어깨 옆에 위치시키고 시작합니다. 위로 밀어 올렸다가 천천히 내립니다. 좌우 독립적으로 움직여 균형 발달에 도움이 됩니다. 어깨 전체 발달에 효과적입니다.',
    '페이스풀': '케이블 로프를 얼굴 높이에 맞춰 세팅합니다. 얼굴 쪽으로 당기며 팔꿈치를 벌립니다. 견갑골을 모으며 수축을 느낍니다. 후면 어깨와 자세 개선에 도움이 됩니다.',
    '리어델트플라이': '상체를 숙인 상태에서 덤벨을 양옆으로 벌립니다. 팔꿈치를 살짝 굽힌 상태를 유지합니다. 반동 없이 천천히 움직이는 것이 중요합니다. 후면 삼각근 발달에 효과적입니다.',

    // 하체
    '스쿼트': '바벨을 등에 올리고 어깨너비로 섭니다. 엉덩이를 뒤로 빼며 앉았다가 일어납니다. 무릎과 발끝 방향을 맞춰줍니다. 하체 전체 발달의 핵심 운동입니다.',
    '레그프레스': '머신에 앉아 발을 발판에 올립니다. 무릎을 굽혀 내렸다가 밀어 올립니다. 허리가 뜨지 않도록 주의합니다. 하체에 큰 부하를 줄 수 있습니다.',
    '런지': '한 발을 앞으로 내딛고 무릎을 굽혀 내려갑니다. 앞발로 지면을 밀며 원위치합니다. 좌우 다리를 번갈아 수행합니다. 하체 균형과 안정성 향상에 좋습니다.',
    '레그컬': '머신에 엎드리거나 앉아 시작합니다. 발목 패드를 이용해 다리를 굽힙니다. 햄스트링 수축을 느끼며 천천히 내립니다. 허벅지 뒤쪽 발달에 효과적입니다.',
    '레그익스텐션': '머신에 앉아 발목 패드를 걸칩니다. 무릎을 펴며 다리를 들어 올립니다. 정점에서 잠시 수축 후 천천히 내립니다. 허벅지 앞쪽을 집중적으로 발달시킵니다.',

    // 팔
    '바벨컬': '어깨너비로 바벨을 잡고 시작합니다. 팔꿈치를 고정한 채 바벨을 들어 올립니다. 상체 반동을 최소화합니다. 이두근 전체 발달에 효과적입니다.',
    '해머컬': '덤벨을 세로로 잡고 수행합니다. 팔꿈치를 고정한 채 들어 올립니다. 손목을 돌리지 않고 유지합니다. 전완근과 상완근 발달에 좋습니다.',
    '케이블컬': '케이블 바를 잡고 팔꿈치를 몸 옆에 고정합니다. 이두근 힘으로 당겼다가 천천히 내립니다. 운동 내내 일정한 저항을 받을 수 있습니다. 이두근 자극 유지에 효과적입니다.',
    '트라이셉스푸시다운': '케이블 바 또는 로프를 잡고 시작합니다. 팔꿈치를 몸에 붙인 상태로 아래로 밀어냅니다. 완전히 펴며 삼두근을 수축합니다. 삼두근 발달의 기본 운동입니다.',
    '오버헤드익스텐션': '덤벨 또는 케이블을 머리 뒤에 위치시킵니다. 팔꿈치를 펴며 위로 밀어 올립니다. 팔꿈치가 벌어지지 않도록 유지합니다. 삼두근 장두 발달에 효과적입니다.'
};

// 2. DOM 요소 가져오기
const routineForm = document.getElementById('routine-form');
const usernameInput = document.getElementById('username');
const btnGenerate = document.getElementById('btn-generate');
const resultTitle = document.getElementById('result-title');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultTableContainer = document.getElementById('result-table-container');
const routineTbody = document.getElementById('routine-tbody');

// 모달 요소
const exerciseModal = document.getElementById('exercise-modal');
const modalOverlay = document.getElementById('modal-overlay');
const btnModalClose = document.getElementById('btn-modal-close');
const modalPartName = document.getElementById('modal-part-name');
const exerciseList = document.getElementById('exercise-list');

// 요일 정렬 가중치 (결과 테이블 표시 시 월~일 순 정렬을 위해 필요)
const DAY_ORDER = { '월': 1, '화': 2, '수': 3, '목': 4, '금': 5, '토': 6, '일': 7 };

// 3. 초기 로딩 및 로컬 스토리지 데이터 불러오기
window.addEventListener('DOMContentLoaded', () => {
    // Lucide 아이콘 활성화
    lucide.createIcons();
    
    // 로컬 스토리지에 저장된 이전 루틴이 있다면 자동 복원
    loadSavedRoutine();
});

// 4. 루틴 생성 이벤트 바인딩
btnGenerate.addEventListener('click', generateRoutine);

function generateRoutine() {
    // 데이터 유효성 검사
    const username = usernameInput.value.trim();
    if (!username) {
        alert('이름을 입력해주세요.');
        usernameInput.focus();
        return;
    }

    // 선택된 운동 부위 배열
    const selectedParts = Array.from(document.querySelectorAll('input[name="workout-part"]:checked'))
                               .map(el => el.value);
    if (selectedParts.length === 0) {
        alert('최소 하나 이상의 운동 부위를 선택해주세요.');
        return;
    }

    // 선택된 운동 요일 배열
    const selectedDays = Array.from(document.querySelectorAll('input[name="workout-day"]:checked'))
                              .map(el => el.value);
    if (selectedDays.length === 0) {
        alert('최소 하루 이상의 운동 요일을 선택해주세요.');
        return;
    }

    // 요일 순서에 맞춰 정렬 (월, 화, 수, 목, 금 순서)
    selectedDays.sort((a, b) => DAY_ORDER[a] - DAY_ORDER[b]);

    // 루틴 매칭 알고리즘 실행
    const routine = runRoutineMatchAlgorithm(selectedDays, selectedParts);

    // 테이블 렌더링 및 UI 표시
    renderRoutineTable(username, routine);

    // 로컬 스토리지에 저장
    saveRoutineToStorage(username, selectedDays, selectedParts);
}

// 5. 요일-운동 부위 자동 매칭 알고리즘
function runRoutineMatchAlgorithm(days, parts) {
    const routine = {};
    days.forEach(day => routine[day] = []);

    if (parts.length <= days.length) {
        // 부위보다 요일이 많거나 같을 때: 요일마다 순환하여 하나씩 매칭 (골고루 분포)
        let partIndex = 0;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            routine[day].push(parts[partIndex]);
            partIndex = (partIndex + 1) % parts.length;
        }
    } else {
        // 부위가 요일보다 많을 때: 요일에 부위를 고르게 나누어 할당
        // 순서대로 배정하여 모든 부위가 포함되게 함
        for (let i = 0; i < parts.length; i++) {
            const day = days[i % days.length];
            routine[day].push(parts[i]);
        }
    }
    return routine;
}

// 6. 결과 표(Table) 렌더링
function renderRoutineTable(username, routine) {
    // 텍스트 타이틀 설정
    resultTitle.textContent = `${username}님의 운동 루틴`;

    // 플레이스홀더 숨기고 테이블 컨테이너 표시
    resultPlaceholder.classList.add('hidden');
    resultTableContainer.classList.remove('hidden');

    // 기존 데이터 비우기
    routineTbody.innerHTML = '';

    // 정렬된 요일 목록 가져오기
    const days = Object.keys(routine).sort((a, b) => DAY_ORDER[a] - DAY_ORDER[b]);

    days.forEach(day => {
        const tr = document.createElement('tr');
        
        // 요일 셀
        const tdDay = document.createElement('td');
        tdDay.textContent = day;
        tr.appendChild(tdDay);

        // 운동부위 셀
        const tdParts = document.createElement('td');
        const parts = routine[day];

        if (parts.length === 0) {
            tdParts.innerHTML = '<span class="rest-text">휴식 (Rest Day)</span>';
        } else {
            parts.forEach(part => {
                const chip = document.createElement('span');
                chip.className = 'table-part-chip';
                chip.textContent = part;
                chip.setAttribute('data-part', part);
                
                // 클릭 시 추천 운동 팝업 띄우기 이벤트 바인딩
                chip.addEventListener('click', () => openExerciseModal(part));
                tdParts.appendChild(chip);
            });
        }
        tr.appendChild(tdParts);
        routineTbody.appendChild(tr);
    });
}

// 7. 모달 제어 (추천 운동 표시 및 아코디언 추가)
function openExerciseModal(part) {
    modalPartName.textContent = part;
    exerciseList.innerHTML = '';

    const exercises = EXERCISE_DATA[part] || [];
    exercises.forEach((ex, index) => {
        const li = document.createElement('li');
        li.className = 'exercise-item';
        
        // 순차 등장을 위한 딜레이 설정
        li.style.animationDelay = `${index * 0.08}s`;
        
        const details = EXERCISE_DETAILS[ex] || '운동 방법이 아직 등록되지 않았습니다.';
        
        // 아코디언 형태로 구조 변경
        li.innerHTML = `
            <div class="exercise-summary">
                <div class="exercise-summary-left">
                    <span class="exercise-num">${index + 1}</span>
                    <span class="exercise-name">${ex}</span>
                </div>
                <i data-lucide="chevron-down" class="exercise-chevron"></i>
            </div>
            <div class="exercise-desc">
                <div class="exercise-desc-inner">
                    ${details}
                </div>
            </div>
        `;
        
        // 클릭 시 아코디언 토글 이벤트
        li.addEventListener('click', (e) => {
            // 이미 active 상태이면 닫고, 아니면 다른 것 다 닫고 이것만 열기(아코디언 기본 동작)
            const isActive = li.classList.contains('active');
            
            // 다른 형제 리스트 닫기 (선택사항, 사용자 사용성 증대)
            const siblingItems = exerciseList.querySelectorAll('.exercise-item');
            siblingItems.forEach(item => {
                item.classList.remove('active');
                const chevron = item.querySelector('.exercise-chevron');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });

            if (!isActive) {
                li.classList.add('active');
                const chevron = li.querySelector('.exercise-chevron');
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
            }
        });

        exerciseList.appendChild(li);
        
        // 다음 프레임에 애니메이션 클래스 추가하여 자연스러운 페이드인
        requestAnimationFrame(() => {
            li.classList.add('show');
        });
    });

    // 아이콘 새로고침
    lucide.createIcons();

    exerciseModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

function closeExerciseModal() {
    exerciseModal.classList.add('hidden');
    document.body.style.overflow = ''; // 스크롤 복원
}

// 모달 이벤트 바인딩
btnModalClose.addEventListener('click', closeExerciseModal);
modalOverlay.addEventListener('click', closeExerciseModal);

// Esc 키 입력 시 모달 닫기
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !exerciseModal.classList.contains('hidden')) {
        closeExerciseModal();
    }
});

// 8. 로컬 스토리지 저장 및 불러오기
function saveRoutineToStorage(username, days, parts) {
    const data = { username, days, parts };
    localStorage.setItem('fitflow_routine_data', JSON.stringify(data));
}

function loadSavedRoutine() {
    const savedData = localStorage.getItem('fitflow_routine_data');
    if (!savedData) return;

    try {
        const { username, days, parts } = JSON.parse(savedData);

        // 폼 필드 입력 복원
        usernameInput.value = username;

        // 체크박스 복원 (부위)
        parts.forEach(part => {
            const checkbox = document.querySelector(`input[name="workout-part"][value="${part}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // 체크박스 복원 (요일)
        days.forEach(day => {
            const checkbox = document.querySelector(`input[name="workout-day"][value="${day}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // 루틴 재생성 및 테이블 표시
        const routine = runRoutineMatchAlgorithm(days, parts);
        renderRoutineTable(username, routine);
    } catch (e) {
        console.error('로컬스토리지 데이터를 파싱하는 중 오류가 발생했습니다.', e);
        localStorage.removeItem('fitflow_routine_data');
    }
}
