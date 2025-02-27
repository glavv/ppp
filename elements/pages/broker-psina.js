import { html, css, ref } from '../../vendor/fast-element.min.js';
import { validate } from '../../lib/ppp-errors.js';
import { Page, pageStyles } from '../page.js';
import { BROKERS } from '../../lib/const.js';
import '../text-field.js';
import '../button.js';

export const brokerPsinaPageTemplate = html`
  <template class="${(x) => x.generateClasses()}">
    <ppp-loader></ppp-loader>
    <form novalidate>
      <ppp-page-header>
        ${(x) =>
          x.document.name
            ? `Брокеры - Psina - ${x.document.name}`
            : 'Брокеры - Psina'}
      </ppp-page-header>
      <section>
        <div class="label-group">
          <h5>Название подключения</h5>
          <p class="description">
            Произвольное имя, чтобы ссылаться на этот профиль, когда
            потребуется.
          </p>
        </div>
        <div class="input-group">
          <ppp-text-field
            placeholder="Psina"
            value="${(x) => x.document.name}"
            ${ref('name')}
          ></ppp-text-field>
        </div>
      </section>
      <section>
        <div class="label-group">
          <h5>Telegram ID</h5>
          <p class="description">Логин Psina.</p>
        </div>
        <div class="input-group">
          <ppp-text-field
            type="number"
            placeholder="Telegram ID"
            value="${(x) => x.document.login}"
            ${ref('login')}
          ></ppp-text-field>
        </div>
      </section>
      <section>
        <div class="label-group">
          <h5>Пароль Psina</h5>
        </div>
        <div class="input-group">
          <ppp-text-field
            type="password"
            placeholder="Psina password"
            value="${(x) => x.document.password}"
            ${ref('password')}
          ></ppp-text-field>
        </div>
      </section>
      <footer>
        <ppp-button
          type="submit"
          appearance="primary"
          @click="${(x) => x.submitDocument()}"
        >
          Сохранить изменения
        </ppp-button>
      </footer>
    </form>
  </template>
`;

export const brokerPsinaPageStyles = css`
  ${pageStyles}
`;

export class BrokerPsinaPage extends Page {
  collection = 'brokers';

  async validate() {
    await validate(this.name);
    await validate(this.login);
    await validate(this.password);
  }

  async read() {
    return (context) => {
      return context.services
        .get('mongodb-atlas')
        .db('ppp')
        .collection('[%#this.collection%]')
        .findOne({
          _id: new BSON.ObjectId('[%#payload.documentId%]'),
          type: `[%#(await import(ppp.rootUrl + '/lib/const.js')).BROKERS.PSINA%]`
        });
    };
  }

  async find() {
    return {
      type: BROKERS.PSINA,
      name: this.name.value.trim()
    };
  }

  async submit() {
    return {
      $set: {
        name: this.name.value.trim(),
        login: this.login.value.trim(),
        password: this.password.value.trim(),
        version: 1,
        type: BROKERS.PSINA,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    };
  }
}

export default BrokerPsinaPage.compose({
  template: brokerPsinaPageTemplate,
  styles: brokerPsinaPageStyles
}).define();
