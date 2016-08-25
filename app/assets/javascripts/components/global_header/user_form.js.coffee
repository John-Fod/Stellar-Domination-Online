@UserForm = React.createClass

  getInitialState: ->
    username: ''
    email: ''
    password: ''
    password_confirmation: ''


  handleChange: (e) ->
    name = e.target.name
    @setState "#{ name }": e.target.value

  valid: ->
    @state.username && @state.email && @state.password && @state.password_confirmation

  handleSubmit: (e) ->
    e.preventDefault()
    $.post '/users/', { user: @state }, (data) =>
      @props.handleNewUser data
      @setState @getInitialState()
    , 'JSON'

  render: ->
    React.DOM.form
      className: 'user'
      onSubmit: @handleSubmit
      React.DOM.ul
        React.DOM.li
          React.DOM.label
            'Username'
          React.DOM.input
            type: 'text'
            className: ''
            placeholder: 'Username'
            name: 'username'
            value: @state.username
            onChange: @handleChange
        React.DOM.li
          React.DOM.label
            'E-Mail'
          React.DOM.input
            type: 'text'
            className: ''
            placeholder: 'E-Mail'
            name: 'email'
            value: @state.email
            onChange: @handleChange
        React.DOM.li
          React.DOM.label
            'Password'
          React.DOM.input
            type: 'password'
            className: ''
            placeholder: 'Password'
            name: 'password'
            onChange: @handleChange
        React.DOM.li
          React.DOM.label
            'Confirm Password'
          React.DOM.input
            type: 'password'
            className: ''
            placeholder: 'Confirm Password'
            name: 'password_confirmation'
            onChange: @handleChange
        React.DOM.li
          React.DOM.button
            type: 'submit'
            className: 'submit'
            disabled: !@valid()
            'Create User'
