export const generateConfirmAlertOptions = (actionTitle, action, confirmHandler, isCloseOnEscape, isCloseOnClickOutside) => {
    return {
        title: `Confirm ${actionTitle} the offer`,
        message: `Are you sure to ${action} the offer?`,
        buttons: [
            {
                label: 'Yes',
                onClick: () => confirmHandler()
            },
            {
                label: 'No',
                onClick: () => alert('Click No')
            }
        ],
        closeOnEscape: isCloseOnEscape,
        closeOnClickOutside: isCloseOnClickOutside
    }
}
