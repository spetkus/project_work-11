
# “Меsto” (Проектная работа 11) 

Версия **1.0.0**

Учебный курс "Фронтенд-разработчик" в Яндекс.Практикум.

----------

Основная задача итоговой **11 проектной работы** заключалась в сборке написанного ранее проекта **"Меsto"** c помощью **WebPack** и публикацией его на **GitHub Pages**.

## Описание проекта "Mesto"
Проект представляет собой некое лайтовое подобие социальной сети.

Ссылка на  **GitHub Pages** - [перейти](https://spetkus.github.io/project_work-11/)

**Особенности проекта:**
----------
 1.  Проект написан на нативном JavaScript
 2.  Используется ООП подход
 3.  Для работы с данными используется REST API
 4.  Сборка  WebPack = (`Babel, Autoprefixer, PostCSS, gh-pages, html-webpack-plugin, image-webpack-loader, mini-css-extract-plugin, optimize-css-assets-webpack-plugin cross-env, css-loader, cssnano, style-loader file-loader и др.`)

**Реализованный функционал:**
----------
 - Редактирование профиля пользователя (данные + аватар)
 - Добавление фотокарточек
 - Постановка и снятие лайка
 - Удаление собственных карточек с сервера
 - Просмотр фотокарточки в увеличенном размере
 - Live валидация всех форм ввода данных + live обработка запросов к API c последующим изменением DOM


**Инструкция по запуску:**
----------

Предварительно вам понадобится установить: `NodeJS` 
 и менеджер пакетов `NPM`

Следующим шагом клонируем проект:

    git clone git@github.com:spetkus/project_work-11.git
   или
   
    git clone https://github.com/spetkus/project_work-11.git

Устанавливаем зависимости `npm install` в директории проекта

И выбираем один из способов запуска

  1.  `npm run dev` - режим разработки с запуском локального веб сервера расположенного по `http://localhost:8080/`
  2. `npm run build` - режим сборки боевой оптимизированной версии проекта
  3. `npm run deploy` - режим публикации собранного проекта из `build` на **GitHub Pages**