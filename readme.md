<h1 id="cph-submit-chromium">
    <img src=icon-48.png alt="ICON"> cph-submit-chromium
</h1>

Forked from Javtor that forked from abdallamaher that forked from the original agrawal-d's cph-submit.

Originally a firefox add on that enables Codeforces submit with [Competitive Programming Helper](https://github.com/agrawal-d/cph).

Im trying to make it compatible with chromium based browsers with the extension manifest v3.

The extension with v3 manifest doesn't flag any errors at installing but when uploading code from vscode it loads the submit website and then the extension has this error: "Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist."


## Installation For FireFox based browsers

1. Visit https://addons.mozilla.org/en-US/firefox/addon/cph-submit/
1. Install the extension
1. Keep the browser window open when you want to submit from cph in VS Code.

## Installation For Chromium based browsers

### Loading the CRX release

1. Download the CRX from this repository [releases](https://github.com/ArielParra/cph-submit-chromium/releases)
1. Activate developer mode in extensions tab
1. Drag and drop the CRX file into the extensions window

### Compiling and loading as unpacked

1. Install npm
1. Clone this Repository
1. Run ```npm install```
1. Run ```npm audit fix```
1. Run ```npm run webpack```
1. Activate developer mode in extensions tab
1. Click on Load unpacked and select this folder


## Contributing

Contributions are welcome.

## Support

Please create an issue for support.

<p align="right">(<a href="#cph-submit-chromium">back to top</a>)</p>
