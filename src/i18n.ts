import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const locale = 'ru-RU'; // default locale

export default new VueI18n({
    locale,
    messages: {
        'ru-RU': {
            all: 'Все',
            menu: {
                home: 'Главная',
                aboutUs: 'О нас',
                feedBack: 'Обратная связь',
                contactUs: 'Контакты',
                developedBy: 'Разработано',
            },
            home: {
                salesTitle: 'Акции и события',
                servicesTitle: 'Услуги',
                doctorsTitle: 'Наши врачи',
                surveysTitle: 'Опросы',
                more: 'показать еще',
            },
            weekDays: {
                monday: 'Понедельник',
                tuesday: 'Вторник',
                wednesday: 'Среда',
                thursday: 'Четверг',
                friday: 'Пятница',
                saturday: 'Суббота',
                sunday: 'Воскресение',
                workHoursTitle: 'График работы',
            },
            feedBackPageCompany: {
                title: 'Обратная связь',
                description: 'Если у вас есть какие либо предложения по работе сервиса,\n' +
                  '        вы можете оставить комментарий в данной форме.\n' +
                  '        Мы с ним обязательно ознакомимся и сделаем выводы',
                send: 'Отправить',
            },
            doctor: {

            },
        },
        'kz-KZ': {
            all: 'Бәрі',
            menu: {
                home: 'Басты бет',
                aboutUs: 'Біз жайлы',
                feedBack: 'Кері байланыс',
                contactUs: 'Байланысу ақпарат',
                developedBy: 'Жасап шығарды',
            },
            home: {
                salesTitle: 'Акциялар және жаңалықтар',
                servicesTitle: 'Қызметтер',
                doctorsTitle: 'Біздің дәрігерлер',
                surveysTitle: 'Сауалнамалар',
                more: 'көбірек көру',
            },
            weekDays: {
                monday: 'Дүйсенбі',
                tuesday: 'Сейсенбі',
                wednesday: 'Сәрсенбі',
                thursday: 'Бейсенбі',
                friday: 'Жұма',
                saturday: 'Сенбі',
                sunday: 'Жексенбі',
                workHoursTitle: 'Жұмыс уақыты',
            },
            feedBackPageCompany: {
                title: 'Кері байланыс',
                description: 'Егер сізде сервис жұмысы бойынша қандай да бір ұсыныстарыңыз болса,\n' +
                  '        сіз осы нысанда түсініктеме қалдыра аласыз.\n' +
                  '        Біз онымен танысып, қорытынды жасаймыз',
                send: 'Жіберу',
            },
        },
    },
});
