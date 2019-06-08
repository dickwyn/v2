import { task, src, dest } from 'gulp';
import ghpages from 'gh-pages';
import sitemap from 'gulp-sitemap';
import path from 'path';

module.exports = () => {
  task('deploy', cb => {
    src('_site/*.html', {
      read: false,
    })
      .pipe(
        sitemap({
          siteUrl: 'http://www.dickwyn.xyz',
        }),
      )
      .pipe(dest('_site'));
    ghpages.publish(path.join(process.cwd(), '_site'), cb);
  });
};
