//label要素の呼び出し
const heightInput = document.querySelector('.height input');
const weightInput = document.querySelector('.weight input');
const resultOutput = document.querySelector('.result input');
const categoryOutput = document.querySelector('.BMIcategory input');
const table = document.querySelector('.hidden'); //htmlのテーブル要素の呼び込み
const sns = document.querySelector('.Twitter');


function checkinput(inputelement) {
    inputelement.addEventListener('input', () => {
        //inputelement.valueとなんども書くのは面倒だから、valueに代入
        const value = inputelement.value;
        
        //全角数字禁止
        if (/[０-９]/.test(value)) {
            alert("半角数字を入力してください");
            inputelement.value = value.replace(/[０-９]/g, "");
            return;
        };

        
        //小文字アルファベット禁止
        if (/[A-Za-z]/.test(value)) {
            alert("半角数字を入力してください");
            inputelement.value = value.replace(/[A-Za-z]/g, "");
            return;
        };

        //大文字アルファベット禁止
        if (/[あ-ん]/.test(value)) {
            alert("半角数字を入力してください");
            inputelement.value = value.replace(/[あ-ん]/g, "");
            return;
        };

        //子音アルファベット禁止
        if(/[ｑｗｒｔｙｐｌｋｊｈｇｆｄｓｚｘｃｖｂｎ]/.test(value)) {
            alert("半角数字を入力してください");
            inputelement.value = value.replace(/[ｑｗｒｔｙｐｌｋｊｈｇｆｄｓｚｘｃｖｂｎ]/g, "");
        };

         if(/[！”＃＄％＆’（）＝～｜｛‘｝＊＋＿？＞＜]/.test(value)) {
            alert("半角数字を入力してください");
            inputelement.value = value.replace(/[！”＃＄％＆’（）＝～｜｛‘｝＊＋＿？＞＜]/g, "");
        };

         if(/[!"#$%&'()=~|{`}*+_?><]/.test(value)) {
            alert("半角数字を入力してください");
            inputelement.value = value.replace(/[!"#$%&'()=~|{`}*+_?><]/g, "");
        };

    });
};

//引数inputelementに代入
checkinput(heightInput);
checkinput(weightInput);


// button要素を呼び出す
const clickbutton = document.querySelector('button');

// buttonを押したときの動作
clickbutton.addEventListener('click', () => {

    const height = heightInput.value;
    const weight = weightInput.value;

   if (height === '' ||  weight === '') {
    console.log('数値が入力されていません');
    alert('身長と体重を入力してください');
    resultOutput.value = '';
    categoryOutput.value = '';
    return;
};
    // heightInputとweightInput(input要素そのもの)は常に最新の値を保持
    const calculation =  weight / (height / 100) ** 2;
    resultOutput.value = calculation.toFixed(1);
});

//肥満度合いを表示
clickbutton.addEventListener('click', () => {
      if (!resultOutput.value) {
        return;
    };
    
    const bmi = Number(resultOutput.value); //resultOtputを文字列➡数値に変換 

    if (bmi < 18.5) {
        categoryOutput.value = '低体重です';
    } else if (bmi >= 18.5 && bmi < 25) {
        categoryOutput.value = '普通体重です'
    } else if (bmi >= 25) {
        categoryOutput.value = '肥満です'
    };
});

// クリック時に table.html を読み込み
    clickbutton.addEventListener("click", () => {
    
    const height = heightInput.value;
    const weight = weightInput.value;

   if (height === '' ||  weight === '') {
    console.log('数値が入力されていません');
    resultOutput.value = '';
    categoryOutput.value = '';
    return;
};

    const tableHTML = `
        <table class="bmi-table"border="1">
            <tr>
                <th>BMI値</th>
                <th>肥満度</th>
            </tr>
            <tr class="low">
                <td>18.5 未満</td>
                <td>低体重</td>
            </tr>
            <tr class="mid">
                <td>18.5 ~ 24.9</td>
                <td>普通体重</td>
            </tr>
            <tr class="max">
                <td>25.0 以上</td>
                <td>肥満</td>
            </tr>
        </table>
    `;

    table.innerHTML = tableHTML;

    const cell = document.querySelector('.low');
    const cell2 = document.querySelector('.mid');
    const cell3 = document.querySelector('.max');


    //テーブル内をハイライトする関数を作成
    const bmi = Number(resultOutput.value); //resultOtputを文字列➡数値に変換 

    if (bmi < 18.5) {
        cell.classList.add('highlight');
    } else if(bmi >= 18.5 && bmi < 25) {
        cell2.classList.add('highlight');
    } else if (bmi >= 25) {
        cell3.classList.add('highlight');
    };

const snsshare = `<a
  href="https://twitter.com/intent/tweet?url=&text=私のBMIは${resultOutput.value}でした！
  ${categoryOutput.value}！&hashtags=運動,BMI,正月"
  target="_blank"
  rel="nofollow noopener noreferrer"
  ><img src="icon.jpg" class="pic">Twitterで共有する
  </a>`

  sns.innerHTML = snsshare;
});
    
// resetボタンの呼び出し
const resetbutton = document.querySelector('.reset');

//リセットボタン押したときの動作
resetbutton.addEventListener('click', () => {
  heightInput.value  = '';
  weightInput.value  = '';
  resultOutput.value = '';
  categoryOutput.value = '';
  table.innerHTML = '';
  sns.innerHTML = '';
});

