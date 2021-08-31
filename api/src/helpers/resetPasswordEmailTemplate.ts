import IUser from '../interfaces/user';
import dotenv from 'dotenv';

dotenv.config();

export const resetPasswordEmailTemplate = (user: IUser) => {
    const url = `${process.env.FRONT_URL}/auth/reset-password/${user.token}`;
    const emailTemplate = {
        user,
        subject: 'Recruiter Works: Reset Password',
        html: `
        <table style="background-color: #f6f7fb; width: 100%">
        <tbody>
          <tr>
            <td>
              <table style="width: 650px; margin: 0 auto; margin-bottom: 30px">
                <tbody>
                  <tr>
                    <td><img src="../assets/images/cuba-logo1.png" alt=""></td>
                  </tr>
                </tbody>
              </table>
              <table style="width: 650px; margin: 0 auto; background-color: #fff; border-radius: 8px">
                <tbody>
                  <tr>
                    <td style="padding: 30px">
                    <h1 style="
                    font-family: Poppins, sans-serif;
                    color: #7366ff;
                    font-weight: bolder;
                    "> 
                    Recruiter Works!
                    </h1> 
                      <p style="font-family: Poppins, sans-serif;">Hey! Please click below to reset your password.</p>
                      <div class="text-center"><a href="${url}" style="padding: 10px; background-color: #7366ff; color: #fff; display: inline-block; border-radius: 4px; margin-bottom: 18px; font-family: Poppins, sans-serif;">RESET PASSWORD</a></div>
                      <p style="margin-bottom: 0; font-family: Poppins, sans-serif;">Regards!</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="width: 650px; margin: 0 auto; margin-top: 30px">
                <tbody>       
                  <tr style="text-align: center">
                    <td> 
                      <p style="color: #999; margin-bottom: 0; font-family: Poppins, sans-serif;">Powered By Recruiter Works!</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
            `
    };

    return emailTemplate;
};
