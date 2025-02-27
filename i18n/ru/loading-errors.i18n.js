export default function (i18n) {
  i18n.extend({
    $loadingErrors: {
      E_NO_SM_CONNECTION: 'Нет связи с сервисной машиной',
      E_NO_MONGODB_CONNECTION: 'Нет связи с базой данных MongoDB. Возврат к облачной базе...',
      E_BROKEN_ATLAS_REALM_LINK:
        'Хранилище MongoDB Atlas не имеет связи с приложением MongoDB Realm',
      E_OFFLINE_REALM:
        'Приложение MongoDB Realm не в сети или отключено за неактивность',
      E_CLOUD_SERVICES_MISCONFIGURATION_PLEASE_WAIT:
        'Сбой настройки облачных сервисов, пожалуйста, подождите...',
      E_UNKNOWN: 'Ошибка загрузки. Подробности в консоли браузера'
    }
  });
}
