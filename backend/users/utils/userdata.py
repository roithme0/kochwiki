def check_userdata(username):
    if not username:
        raise ValueError("Geben Sie einen Nutzernamen ein.")
