@Users = React.createClass

  getInitialState: ->
    users: @props.data

  getDefaultProps: ->
    users: []

  addUser: (user) ->
    users = @state.users.slice()
    users.push user
    @setState users: users

  deleteUser: (user) ->
    users = @state.users.slice()
    index = users.indexOf user
    users.splice index, 1
    @replaceState users: users

  render: ->
    React.DOM.div
      className: 'users'
      React.DOM.h2
        className: 'title'
        'Users'
      React.createElement UserForm, handleNewUser: @addUser
      React.DOM.table
        className: 'user-table'
        React.DOM.thead null,
          React.DOM.th null, 'Username'
          React.DOM.th null, 'E-Mail'
          React.DOM.th null, 'Delete'
        React.DOM.tbody null,
          for user in @state.users
            React.createElement User, key: user.id, user: user, handleDeleteUser: @deleteUser