@User = React.createClass

  handleDelete: (e) ->
    e.preventDefault()
    $.ajax
      method: 'DELETE'
      url: "/users/#{ @props.user.id }"
      dataType: 'JSON'
      success:() =>
        @props.handleDeleteUser @props.record

  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.user.username
      React.DOM.td null, @props.user.email
      React.DOM.td null,
        React.DOM.button
          className: 'delete button'
          onClick: @handleDelete
          'Delete'