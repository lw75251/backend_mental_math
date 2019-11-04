import user from '../models/user.model';

//Simple version, without validation or sanitation
export function test (req, res) {
    res.send('Greetings from the Test controller!');
}