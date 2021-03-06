const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const { userLogin } = require('../lib')


module.exports = async (ctx) => {
  if (ctx.chat.id > 0) {
    ctx.replyWithHTML(
      ctx.i18n.t('private.start', {
        login: userLogin(ctx.from)
      }),
      
      Extra.HTML().markup((m) =>
        m.inlineKeyboard([
          m.urlButton (ctx.i18n.t('private.btn_add'), `https://t.me/${ctx.options.username}?startgroup=test`)
        ])
      )
    )

    ctx.mixpanel.track('private message')
  } else {
    ctx.mixpanel.track('group message', { group: ctx.chat.id })
  }
}
