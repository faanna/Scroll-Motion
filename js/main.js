//변수 설정을 생각해보시면서
//어느 요소에 DOM조작이 필요한지를 생각해보세요~

//1. offsetTop을 어디어디에 잡을것인가?
// => scrollView클래스를 부여해서 이것으로 잡아줍니다
//2. 리사이즈 이슈
// 3. on클래스를 붙여주는내용
//4. 추가적인 이슈는 base => 높이값이 다를경우는??

const scrollView = document.querySelectorAll('.scrollView');
const btnScroll = document.querySelectorAll('.btnScroll li');
const btnScroll_array = Array.from(btnScroll);
const base = -window.innerHeight / 2;
//base값을 화면(브라우저)의 절반이 지나면 스크롤효과가 나오도록 잡아줍니다
let positionArray = [];
let enableClick = true;
getPosition();
function getPosition() {
	positionArray = [];
	for (const el of scrollView) positionArray.push(el.offsetTop);
}

//li.on이붙은 인덱스를 indexof로 찾으려면 배열이어야합니다

//브라우저의 새로고침이 되면 무조건, 맨위로 올라가도록 코딩합니다
window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

function moveScroll(index) {
	new Anime(window, {
		prop: 'scroll',
		value: positionArray[index],
		duration: 500,
	});
}

btnScroll.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		// console.log(e.target);
		// console.log(e.currentTarget);
		const isOn = e.currentTarget.classList.contains('on');
		// console.log(isOn);
		const scroll = window.scrollY;
		if (isOn && scroll === positionArray[index]) return;
		//if문은 이미 활성화되어있는 버튼을 클릭하거나,
		//스크롤이 해당 영역에 정확히 들어있으면 아무일도 일어나지 않게 합니다
		moveScroll(index);
		//그렇지 않으면 해당 인덱스로 스크롤해주게 합니다
	});
});

//스크롤 이벤트 발생 : 스크롤 할때 on클래스를 이동시키는 코딩

window.addEventListener('scroll', scrollActive);
function scrollActive() {
	const scroll = window.scrollY;
	scrollView.forEach((el, index) => {
		if (scroll >= positionArray[index] + base) {
			for (const el of btnScroll) el.classList.remove('on');
			//on을 붙여야하는 대상은 버튼, 섹션
			btnScroll[index].classList.add('on');
			scrollView[index].classList.add('on');
		}
	});
}

const tab_container = document.querySelector('.tab_container');
const tab_btns = tab_container.querySelectorAll('ul li');
const tab_boxes = tab_container.querySelectorAll('section article');

tab_btns.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		// for(let el of tab_btns) el.classList.remove("on")
		// tab_btns[index].classList.add("on");

		// for(let el of tab_boxes) el.classList.remove("on")
		// tab_boxes[index].classList.add("on");
		activation(tab_btns, index);
		activation(tab_boxes, index);
	});
});

//on을 붙여주는 함수
function activation(arr, index) {
	for (let el of arr) {
		el.classList.remove('on');
		arr[index].classList.add('on');
	}
}
